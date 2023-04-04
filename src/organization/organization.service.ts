import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization, OrganizationInformation } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  create(createOrganizationInput: CreateOrganizationInput) {
    return 'This action adds a new organization';
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return {
      isPrimary: false,
      information: {
        name: `org-${id}`,
        nickName: `org-${id}`,
        ownerNameDisplay: `org-${id}`,
      } as OrganizationInformation
    } as Organization;
  }

  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
