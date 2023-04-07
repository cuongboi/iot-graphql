import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import { SwaggerService } from './swagger.service';
import { TestModule } from './test/test.module';
import { EventModule } from './event/event.module';
import { EventActionModule } from './event-action/event-action.module';
import { EventConditionModule } from './event-condition/event-condition.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || ''}.env`,
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TestModule,
    EventModule,
    EventActionModule,
    EventConditionModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SwaggerService],
})
export class AppModule {}
