import { Resolver, Query, Mutation, Args, Int, ResolveProperty, Parent } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventActionService } from 'src/event-action/event-action.service';
import { EventAction } from 'src/event-action/entities/event-action.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService, private readonly eventActionService: EventActionService) { }

  @ResolveProperty(() => [EventAction], {
    name: 'actions',
  })
  public async getActions(
    @Parent() event: Event
  ) {
    return await this.eventActionService.findAll(event.actions);
  }

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'event' })
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
}
