import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { EventActionService } from 'src/event-action/event-action.service';

@Module({
  providers: [EventResolver, EventService, EventActionService]
})
export class EventModule {}
