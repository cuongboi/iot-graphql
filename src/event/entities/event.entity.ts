import { ObjectType, Field } from '@nestjs/graphql';
import { EventAction } from 'src/event-action/entities/event-action.entity';
import { EventCondition } from 'src/event-condition/entities/event-condition.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { buildProperties } from 'src/utils';

@ObjectType()
export class Event {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  organizationId: string;

  @Field(() => Organization, { description: 'Example field (placeholder)' })
  organization: Organization;

  @Field(() => [EventAction], {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  actions?: EventAction[];

  @Field(() => [EventCondition], {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  conditions?: EventCondition[];

  static from(e: any) {
    return buildProperties(e, [
      { valueName: 'uuid', mapName: 'id' },
      { valueName: 'organization_id', mapName: 'organizationId' },
    ]);
  }
}
