import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventConditionResource {
  @Field(() => String, { description: 'Example field (placeholder)' })
  time_zone: string;
}

@ObjectType()
export class EventCondition {
  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;

  @Field(() => EventConditionResource, { description: 'Example field (placeholder)' })
  resource: EventConditionResource;
}
