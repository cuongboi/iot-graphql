import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import {
  Organization,
  OrganizationInformation,
} from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  create(createOrganizationInput: CreateOrganizationInput) {
    return 'This action adds a new organization';
  }

  async findAll() {
    return (await api.organization.findAll()).data.data;
  }

  async findOne(organizationId: string) {
    return (await api.organization.findOne({ organizationId })).data
      .data as Organization;
  }

  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
