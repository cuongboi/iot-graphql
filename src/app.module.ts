import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import { EventModule } from './event/event.module';
import { EventActionModule } from './event-action/event-action.module';

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: 'schema.gql',
    }),
    EventModule,
    EventActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
