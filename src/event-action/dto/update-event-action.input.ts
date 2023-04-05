import { CreateEventActionInput } from './create-event-action.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventActionInput extends PartialType(CreateEventActionInput) {
  @Field(() => Int)
  id: number;
}
