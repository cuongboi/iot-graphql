import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  create(createEventInput: CreateEventInput) {
    return 'This action adds a new event';
  }

  findAll() {
    return [
      {
        name: 'name1',
        organization_id: 'organization_id',
        actions: ['action1'],
      } as Event,
      {
        name: 'name2',
        organization_id: 'organization_id',
        actions: ['action1'],
      } as Event
    ];
  }

  findOne(id: number) {
    return {
      name: 'name',
      organization_id: 'organization_id',
      actions: ['action1', 'action2', 'action3'],
    } as Event;
  }

  update(id: number, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
