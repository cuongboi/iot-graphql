import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventConditionInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;
}
