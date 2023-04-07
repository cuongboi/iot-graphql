import { CreateEventConditionInput } from './create-event-condition.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventConditionInput extends PartialType(CreateEventConditionInput) {
  @Field(() => Int)
  id: number;
}
