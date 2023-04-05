import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventActionService } from 'src/event-action/event-action.service';
import { EventAction } from 'src/event-action/entities/event-action.entity';
import { EventCondition } from 'src/event-condition/entities/event-condition.entity';
import { EventConditionService } from 'src/event-condition/event-condition.service';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationService } from 'src/organization/organization.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly eventActionService: EventActionService,
    private readonly eventConditionService: EventConditionService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.remove(id);
  }

  @ResolveProperty(() => [EventAction], { name: 'actions' })
  public async getActions(@Parent() event: Event) {
    return await this.eventActionService.findAll(event.actionIds);
  }

  @ResolveProperty(() => [EventCondition], { name: 'conditions' })
  public async getConditions(@Parent() event: Event) {
    return await this.eventConditionService.findAll(event.conditionIds);
  }

  @ResolveProperty(() => Organization, { name: 'organization' })
  public async getOrganization(@Parent() event: Event) {
    return await this.organizationService.findOne(event.organizationId);
  }
}
