import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { EventActionService } from 'src/event-action/event-action.service';
import { EventConditionService } from 'src/event-condition/event-condition.service';
import { OrganizationService } from 'src/organization/organization.service';

@Module({
  providers: [EventResolver, EventService, EventActionService, EventConditionService, OrganizationService]
})
export class EventModule {}
