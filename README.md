# GraphQL 

### ENV 
- NodeJS 18.x
- NestJS 9.3.12 

### Installation 
``` 
$ pnpm install 
``` 

### Run on Dev 
``` 
$ pnpm start:dev
```

### Generate new module 
``` 
$ nest g resource <module name>
``` 
Then select graphql (code first)

### Generate API Service to Axios Service 
- Add Swagger Json file to directory ./swagger-to-service/jsons
- Run command `pnpm swagger-to-service` to create Axios Services
