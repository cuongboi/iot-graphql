import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrganizationInformation {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  ownerNameDisplay: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  nickName: string;
}

@ObjectType()
export class Organization {
  @Field(() => Boolean, { description: 'Example field (placeholder)' })
  isPrimary: boolean;

  @Field(() => OrganizationInformation, {
    description: 'Example field (placeholder)',
  })
  information: OrganizationInformation;
}
