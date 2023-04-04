import { Module } from '@nestjs/common';
import { EventActionService } from './event-action.service';
import { EventActionResolver } from './event-action.resolver';

@Module({
  providers: [EventActionResolver, EventActionService]
})
export class EventActionModule {}
