#!/usr/bin/env node

import tsMorph from 'ts-morph';
import openapiTypescript from 'openapi-typescript';
import fs from 'fs';
import glob from 'glob';
import _ from 'lodash';
import { dirname, resolve } from 'path';

process.chdir(resolve(dirname(import.meta.url.replace('file:///', '')), '..'));

function swaggerFileSearch(sourceFile, paths, backObject = null, delim = '|') {
  const pathInterface = sourceFile.getInterface('paths');
  const componentsInterface = sourceFile.getInterface('components');
  const operationInterface = sourceFile.getInterface('operations');

  if (!pathInterface || !componentsInterface) {
    return;
  }

  const getPathList = paths.split(delim);
  const currentPath = getPathList.shift();

  if (currentPath === 'components') {
    return swaggerFileSearch(
      sourceFile,
      getPathList.join(delim),
      componentsInterface,
      delim,
    );
  }

  if (currentPath === 'operations') {
    return swaggerFileSearch(
      sourceFile,
      getPathList.join(delim),
      operationInterface,
      delim,
    );
  }

  backObject = backObject || pathInterface;

  const currentObject = backObject
    .getMembers?.()
    .find((node) => node.getName() === currentPath);

  if (currentObject === undefined) {
    return;
  }

  if (getPathList.length === 0) {
    return currentObject;
  }

  return swaggerFileSearch(
    sourceFile,
    getPathList.join(delim),
    currentObject.getTypeNode(),
    delim,
  );
}

async function writeTemporarily() {
  const swaggerFileList = glob.sync('jsons/*.json');
  const objects = [];

  const project = new tsMorph.Project({
    compilerOptions: {
      target: tsMorph.ScriptTarget.ES2015,
      module: 'commonjs',
    },
  });

  for await (let swaggerFile of swaggerFileList) {
    const swagger = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
    const result = await openapiTypescript(swagger);
    const sourcePath = swaggerFile
      .replace('jsons', 'generated')
      .replace('.json', '.ts');

    const sourceFile = project.createSourceFile(sourcePath, result, {
      overwrite: true,
    });

    const newSourceText = sourceFile
      .getFullText()
      .replace(
        /\(?components\[\"(\w+)\"\]\[\"(\w+)\"\]\)?/g,
        (match, p1, p2) => {
          return swaggerFileSearch(sourceFile, `components|${p1}|${p2}`)
            .getType()
            .getText();
        },
      )
      .replace(/\(?operations\[\"(\w+)\"\]\)?/g, (match, op) => {
        return swaggerFileSearch(sourceFile, `operations|${op}`)
          .getType()
          .getText();
      });

    sourceFile.replaceWithText(newSourceText);

    const pathInterface = sourceFile.getInterface('paths');

    pathInterface.getMembers()?.forEach((urlPath) => {
      const urlPathName = urlPath.getName();

      urlPath
        .getTypeNode()
        ?.getMembers()
        ?.forEach((method) => {
          const requestUrl = urlPathName.replace(/\"/g, '');
          const requestMethod = method.getName();
          const operationName =
            swagger.paths[requestUrl]?.[requestMethod]?.operationId;
          const summary = swagger.paths[requestUrl]?.[requestMethod]?.summary;

          const restObj = {
            name: operationName || _.camelCase(summary),
            url: requestUrl,
            method: requestMethod,
            path: {},
            param: {},
            body: {},
            response: {},
          };

          restObj.path =
            swaggerFileSearch(
              sourceFile,
              'parameters|path',
              method.getTypeNode(),
            )
              ?.getType()
              .getText() || undefined;
          restObj.query =
            swaggerFileSearch(
              sourceFile,
              'parameters|query',
              method.getTypeNode(),
            )
              ?.getType()
              .getText() || undefined;

          restObj.requestBody =
            swaggerFileSearch(
              sourceFile,
              'requestBody|content|"application/json"',
              method.getTypeNode(),
            )
              ?.getType()
              .getText() || undefined;

          const response =
            swaggerFileSearch(
              sourceFile,
              'responses|200',
              method.getTypeNode(),
            ) ||
            swaggerFileSearch(
              sourceFile,
              'responses|201',
              method.getTypeNode(),
            ) ||
            swaggerFileSearch(
              sourceFile,
              'responses|204',
              method.getTypeNode(),
            );

          if (response) {
            restObj.response =
              swaggerFileSearch(
                sourceFile,
                'content|"application/json"',
                response.getTypeNode(),
              )
                ?.getType()
                ?.getText() || undefined;
          }

          if (!operationName) {
            if (restObj.path && restObj.name.match(/By.*/)) {
              const pathParam = restObj.path.matchAll(/(\w+)\:/g);
              const pathParamList = [];

              for (const param of pathParam) {
                pathParamList.push(param[1]);
              }

              restObj.name =
                restObj.name.replace(/By.*/, '') +
                'By' +
                pathParamList
                  .map((v) => _.upperFirst(_.camelCase(v)))
                  .join('And');
            }
          }

          objects.push(restObj);
        });
    });
  }

  await writeIndexFile(objects);
}

async function writeIndexFile(objects) {
  const project = new tsMorph.Project({
    compilerOptions: {
      declaration: true,
      outDir: 'dist',
    },
  });

  // Write index source
  const sourceIndexFile = project.createSourceFile('index.ts', '', {
    overwrite: true,
    isTypeAliasImport: true,
  });

  sourceIndexFile.addImportDeclaration({
    namedImports: ['AxiosInstance', 'AxiosRequestConfig', 'AxiosResponse'],
    moduleSpecifier: 'axios',
    isTypeAliasImport: true,
  });

  const classDeclaration = sourceIndexFile.addClass({
    name: 'SwaggerApi',
    isDefaultExport: true,
  });

  // Create private constructor
  classDeclaration.addProperties([
    {
      name: 'axiosInstance',
      type: 'AxiosInstance',
    },
    {
      name: 'options',
      type: 'Partial<AxiosRequestConfig>',
    },
  ]);

  classDeclaration.addConstructor({
    parameters: [
      {
        name: 'axiosInstance',
        type: 'AxiosInstance',
        isReadonly: true,
      },
      {
        name: 'options',
        type: 'Partial<AxiosRequestConfig>',
        isReadonly: true,
        hasQuestionToken: true,
      },
    ],
    statements: [
      'this.axiosInstance = axiosInstance;',
      'this.options = options;',
    ],
  });

  for await (let obj of objects) {
    classDeclaration.addMethod({
      name: obj.name,
      parameters: [
        obj.path
          ? {
              name: 'path',
              type: obj.path,
            }
          : null,
        obj.query
          ? {
              name: 'params',
              type: obj.query,
            }
          : null,
        obj.requestBody
          ? {
              name: 'data',
              type: obj.requestBody,
            }
          : null,
          {
            name: 'options',
            type: 'Partial<AxiosRequestConfig>',
            hasQuestionToken: true,
          }
      ].filter((v) => v !== null),
      returnType: obj.response ? `Promise<AxiosResponse<${obj.response}>>` : undefined,
      isAsync: true,
      statements: [
        'return this._request({',
        `  method: '${obj.method}',`,
        `  url: '${obj.url}',`,
        obj.path ? '  path,' : '',
        obj.query ? '  params,' : '',
        obj.requestBody ? '  data,' : '',
        '});',
      ].filter((v) => v !== ''),
    });
  }

  classDeclaration.addMethod({
    name: '_request',
    privacy: 'private',
    returnType: 'Promise<any>',
    parameters: [
      {
        name: 'options?',
        type: 'Record<string, any>',
      },
    ],
    statements: [
      `options.url = options.url.replace(/\{(\w+)\}/g, (match, p1) => options.path?.[p1])`,
      'delete options.path;',
      'return this.axiosInstance.request({...options, ...this.options});',
    ],
  });

  project.emitSync();
}

(async () => {
  await writeTemporarily();
})();
