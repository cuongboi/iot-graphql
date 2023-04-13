import { $ as execaInit } from 'execa';
import { basename, dirname, resolve } from 'path';
import { Project } from 'ts-morph';
import glob from 'glob';
import protos from 'google-proto-files';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2)).argv;
const helpContent = `
Usage: node index.mjs [options]
Options:
  -h, --help: Show help
  -p, --proto: Proto path
  -t, --target: Target path is NestJs src folder
`;

if (argv.h || argv.help) {
  console.log(helpContent);
  process.exit(0);
}

if ((!argv.p && !argv.proto) || (!argv.t && !argv.target)) {
  console.log(helpContent);
  process.exit(1);
}

const protoFromPath = resolve(process.cwd(), argv.p || argv.proto || '.');
const targetPath = resolve(process.cwd(), argv.t || argv.target || './src');

process.chdir(resolve(dirname(import.meta.url.replace('file:///', '')), '.'));
const protoTarget = 'proto/*.proto';

const $ = execaInit({
  stdio: 'pipe',
  shell: true,
});

async function generateTs() {
  try {
    await $`rm -rf proto`;
    await $`mkdir proto`;
    await $`cp -r ${protoFromPath}/*.proto ./proto`;
    await $`rm -rf compiled_proto`;
    await $`mkdir compiled_proto`;
    await $`npx protoc --proto_path=proto --plugin=./node_modules/.bin/protoc-gen-ts_proto.CMD --ts_proto_out=./compiled_proto ${protoTarget}`;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function getTsFiles() {
  return glob.sync('compiled_proto/**/*.ts');
}

async function generateJs() {
  const project = new Project({
    compilerOptions: {
      target: 'ES2017',
      module: 'CommonJS',
      // declaration: true,
      outDir: 'dist',
    },
  });

  const sourceNestJsModule = project.createSourceFile(
    'grpc/grpc-nestjs.module.ts',
    '',
    { overwrite: true },
  );

  const sourceNestJsService = project.createSourceFile(
    'grpc/grpc-nestjs.service.ts',
    '',
    { overwrite: true },
  );

  sourceNestJsModule.addImportDeclarations([
    {
      namedImports: ['Module'],
      moduleSpecifier: '@nestjs/common',
    },
    {
      namedImports: ['ClientsModule', 'Transport'],
      moduleSpecifier: '@nestjs/microservices',
    },
    {
      namedImports: ['GrpcNestjsService'],
      moduleSpecifier: './grpc-nestjs.service',
    },
  ]);

  sourceNestJsService.addImportDeclarations([
    {
      namedImports: ['Injectable', 'Inject'],
      moduleSpecifier: '@nestjs/common',
    },
    {
      namedImports: ['ClientGrpc'],
      moduleSpecifier: '@nestjs/microservices',
    },
  ]);

  const sourceNestJsModuleClass = sourceNestJsModule.addClass({
    name: 'GrpcNestjsModule',
    isExported: true,
    statements: [],
  });

  const sourceNestJsServiceClass = sourceNestJsService.addClass({
    name: 'GrpcNestjsService',
    isExported: true,
    decorators: [
      {
        name: 'Injectable',
        arguments: [],
      },
    ],
  });

  const files = await getTsFiles();
  const grpcModules = [];
  const GRPCServices = [];

  for (const file of files) {
    const protoPath = file
      .replace('compiled_proto', 'proto')
      .replace('.ts', '.proto');

    const protoCons = protos.loadSync(protoPath).nestedArray.at(0);
    const service = Object.values(protoCons || {}).find((i) => i?.methods);

    grpcModules.push({
      name: protoCons.name.toUpperCase() + '_PACKAGE',
      transport: 'Transport.GRPC',
      options: {
        package: protoCons.name,
        protoPath: `./proto/${basename(protoPath)}`,
        url: `localhost:50051`,
      },
    });
    const sourceFile = project.addSourceFileAtPath(file);
    // Remove all import
    sourceFile.getImportDeclarations().forEach((i) => i.remove());
    sourceFile.addImportDeclaration({
      namedImports: ['Observable'],
      moduleSpecifier: 'rxjs',
    });
    sourceFile.getFunctions().forEach((i) => i.remove());
    sourceFile.getClasses().forEach((i) => i.remove());
    sourceFile.getVariableDeclarations().forEach((i) => i.remove());
    sourceFile.getTypeAliases().forEach((i) => i.remove());
    sourceFile.getImportDeclaration('protobufjs/minimal')?.remove();
    sourceFile
      .getInterfaces()
      .forEach((i) => i.getName() === 'Rpc' && i.remove());
    const mainInterface = sourceFile
      .getInterfaces()
      .find((i) => i.getName() === service.name);

    mainInterface.getMethods().forEach((method) => {
      // Update method response type promise to Observable
      const returnType = method.getReturnTypeNodeOrThrow();
      const returnTypeText = returnType
        .getText()
        .replaceAll('Promise', 'Observable');
      returnType.replaceWithText(returnTypeText);
    });

    GRPCServices.push({
      packageName: protoCons.name.toUpperCase() + '_PACKAGE',
      name: protoCons.name,
      type: mainInterface.getName(),
      service: service.name,
    });

    project
      .createSourceFile(
        `grpc/types/${protoCons.name}.types.ts`,
        sourceFile.getText(),
        {
          overwrite: true,
        },
      )
      .saveSync();

    sourceNestJsService.addImportDeclaration({
      namedImports: [mainInterface.getName()],
      moduleSpecifier: `./types/${protoCons.name}.types`,
    });
  }

  sourceNestJsModuleClass.addDecorator({
    name: 'Module',
    arguments: [
      `{
        imports: [
            ClientsModule.register(${JSON.stringify(grpcModules, null, 4)}),
        ],
        providers: [GrpcNestjsService],
        exports: [GrpcNestjsService], // This is IMPORTANT,  you need to export GRPCService here so that other modules can use it
    }`.replaceAll(/\"Transport.GRPC\"/g, 'Transport.GRPC'),
    ],
  });

  for (const service of GRPCServices) {
    sourceNestJsServiceClass.addProperty({
      name: service.name,
      type: service.type,
      scope: 'public',
    });
  }

  sourceNestJsServiceClass.addConstructor({
    parameters: GRPCServices.map((service) => {
      return {
        name: service.name + 'Service',
        type: 'ClientGrpc',
        decorators: [
          {
            name: 'Inject',
            arguments: [`'${service.packageName}'`],
          },
        ],
      };
    }),
    statements: GRPCServices.map((service) => {
      return `this.${service.name} = ${service.name}Service.getService<${service.type}>('${service.service}');`;
    }),
  });

  sourceNestJsModuleClass.formatText();
  sourceNestJsServiceClass.formatText();

  sourceNestJsModule.saveSync();
  sourceNestJsService.saveSync();

  await $`rm -rf ${targetPath}/grpc`;
  await $`mv grpc ${targetPath}`;
  await $`mv proto ${targetPath}/grpc`;
  $`rm -rf compiled_proto`;
}

(async () => {
  await generateTs();
  await generateJs();
})();
