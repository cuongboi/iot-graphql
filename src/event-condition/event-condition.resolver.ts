import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventConditionService } from './event-condition.service';
import { EventCondition } from './entities/event-condition.entity';
import { CreateEventConditionInput } from './dto/create-event-condition.input';
import { UpdateEventConditionInput } from './dto/update-event-condition.input';

@Resolver(() => EventCondition)
export class EventConditionResolver {
  constructor(private readonly eventConditionService: EventConditionService) {}

  @Mutation(() => EventCondition)
  createEventCondition(
    @Args('createEventConditionInput')
    createEventConditionInput: CreateEventConditionInput,
  ) {
    return this.eventConditionService.create(createEventConditionInput);
  }

  @Query(() => [EventCondition], { name: 'eventConditions' })
  findAll(@Args('eventId', { type: () => String }) eventId: string) {
    return this.eventConditionService.findAll(eventId);
  }

  @Query(() => EventCondition, { name: 'eventCondition' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventConditionService.findOne(id);
  }

  @Mutation(() => EventCondition)
  updateEventCondition(
    @Args('updateEventConditionInput')
    updateEventConditionInput: UpdateEventConditionInput,
  ) {
    return this.eventConditionService.update(
      updateEventConditionInput.id,
      updateEventConditionInput,
    );
  }

  @Mutation(() => EventCondition)
  removeEventCondition(@Args('id', { type: () => Int }) id: number) {
    return this.eventConditionService.remove(id);
  }
}
