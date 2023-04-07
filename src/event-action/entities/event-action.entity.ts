import { ObjectType, Field, Int } from '@nestjs/graphql';
import { buildProperties } from 'src/utils';

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
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  type_: string;

  @Field(() => Int, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  slot: number;

  @Field(() => Int, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  order: number;

  @Field(() => EventActionResource, {
    description: 'Example field (placeholder)',
  })
  resource: EventActionResource;

  @Field(() => String, { description: 'Example field (placeholder)' })
  updatedAt: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  createdAt: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  eventId: string;

  static from(e: any) {
    return buildProperties(e, [
      { valueName: 'uuid', mapName: 'id' },
      { valueName: 'event_uuid', mapName: 'eventId' },
      { valueName: 'create_time', mapName: 'createdAt' },
      { valueName: 'modify_time', mapName: 'updatedAt' },
      { valueName: 'organization_id', mapName: 'organizationId' },
    ]);
  }
}
