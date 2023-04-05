import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventActionService } from './event-action.service';
import { EventAction } from './entities/event-action.entity';
import { CreateEventActionInput } from './dto/create-event-action.input';
import { UpdateEventActionInput } from './dto/update-event-action.input';

@Resolver(() => EventAction)
export class EventActionResolver {
  constructor(private readonly eventActionService: EventActionService) {}

  @Mutation(() => EventAction)
  createEventAction(@Args('createEventActionInput') createEventActionInput: CreateEventActionInput) {
    return this.eventActionService.create(createEventActionInput);
  }

  @Query(() => [EventAction], { name: 'eventActions' })
  findAll() {
    return this.eventActionService.findAll();
  }

  @Query(() => EventAction, { name: 'eventAction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventActionService.findOne(id);
  }

  @Mutation(() => EventAction)
  updateEventAction(@Args('updateEventActionInput') updateEventActionInput: UpdateEventActionInput) {
    return this.eventActionService.update(updateEventActionInput.id, updateEventActionInput);
  }

  @Mutation(() => EventAction)
  removeEventAction(@Args('id', { type: () => Int }) id: number) {
    return this.eventActionService.remove(id);
  }
}
