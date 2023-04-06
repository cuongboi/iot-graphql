import { ObjectType, Field, Int } from '@nestjs/graphql';
import { buildProperties } from 'src/utils';

@ObjectType()
export class EventConditionResource {
  @Field(() => String, { description: 'Example field (placeholder)' })
  time_zone: string;
}

@ObjectType()
export class EventCondition {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;

  @Field(() => EventConditionResource, {
    description: 'Example field (placeholder)',
  })
  resource: EventConditionResource;

  static from(e: any) {
    return buildProperties(e, [
      { valueName: 'uuid', mapName: 'id' },
      { valueName: 'organization_id', mapName: 'organizationId' },
    ]);
  }
}
