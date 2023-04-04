import { InputType, Int, Field } from '@nestjs/graphql';
import { EventActionResource } from '../entities/event-action.entity';

@InputType()
export class CreateEventActionResourceInput {
  @Field(() => [String], { description: 'Example field (placeholder)' })
  recipients: string[];

  @Field(() => String, { description: 'Example field (placeholder)' })
  subject: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  content: string;
}

@InputType()
export class CreateEventActionInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;

  @Field(() => CreateEventActionResourceInput, { description: 'Example field (placeholder)' })
  resource: EventActionResource;
}
