import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventActionResource {
  @Field(() => [String], { description: 'Example field (placeholder)' })
  recipients: string[];

  @Field(() => String, { description: 'Example field (placeholder)' })
  subject: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  content: string;
}

@ObjectType()
export class EventAction {
  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;

  @Field(() => EventActionResource, { description: 'Example field (placeholder)' })
  resource: EventActionResource;
}
