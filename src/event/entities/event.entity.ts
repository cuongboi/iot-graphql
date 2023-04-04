import { ObjectType, Field } from '@nestjs/graphql';
import { EventAction } from 'src/event-action/entities/event-action.entity';
import { EventCondition } from 'src/event-condition/entities/event-condition.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@ObjectType()
export class Event {

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  organizationId: string;

  @Field(() => Organization, { description: 'Example field (placeholder)' })
  organization: Organization;

  @Field(() => [String], { description: 'Example field (placeholder)' })
  actionIds: string[];

  @Field(() => [EventAction], { description: 'Example field (placeholder)' })
  actions: EventAction[];

  @Field(() => [String], { description: 'Example field (placeholder)' })
  conditionIds: string[];

  @Field(() => [EventCondition], { description: 'Example field (placeholder)' })
  conditions: EventCondition[];
}
