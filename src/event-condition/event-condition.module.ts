import { Module } from '@nestjs/common';
import { EventConditionService } from './event-condition.service';
import { EventConditionResolver } from './event-condition.resolver';

@Module({
  providers: [EventConditionResolver, EventConditionService]
})
export class EventConditionModule {}
