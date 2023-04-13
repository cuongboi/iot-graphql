# Generate GRPC Module for NestJs from proto file 

### Command 
```
Usage: node index.mjs [options]
Options:
  -h, --help: Show help
  -p, --proto: Proto path
  -t, --target: Target path is NestJs src folder
```      

### Config 
- Add .proto file to an folder 
- Run command to generate grpc module for NestJs 
- Update file `src/grpc/grpc-nestjs.module.ts` with exact gRPC url foreach package
- Update `src/app.module.ts` with imports of Module decorators is include grpc Module. 
- Example: 
```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcNestjsModule } from './grpc/grpc-nestjs.module';

@Module({
  imports: [
    GrpcNestjsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Use Grpc Service 
- Contruct to call service is <gRPC Module Export>.<gRPC Package>.<gRPC Method>(<gRPC Method Param>)
- Example Code 
```
export class AppController {
  constructor(private readonly appService: AppService,
      private readonly grpcNestjsService: GrpcNestjsService
    ) {}

  @Get()
  async getHello(@Query('name') name: string): Promise<HelloReply> {
    const greeting = await lastValueFrom(this.grpcNestjsService.helloworld.SayHello({ name }));
    return greeting;
  }
}
```