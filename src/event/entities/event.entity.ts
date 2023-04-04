import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Event {

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  organization_id: string;

  @Field(() => [String], { description: 'Example field (placeholder)' })
  actions: string[];
}
