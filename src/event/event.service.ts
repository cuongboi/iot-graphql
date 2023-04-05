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
        organizationId: 'organizationId',
        actionIds: ['action1'],
      } as Event,
      {
        name: 'name2',
        organizationId: 'organizationId',
        actionIds: ['action1'],
      } as Event
    ];
  }

  findOne(id: number) {
    return {
      name: 'name',
      organizationId: 'organizationId',
      actionIds: ['action1', 'action2', 'action3'],
      conditionIds: ['condition1', 'condition2', 'condition3'],
    } as Event;
  }

  update(id: number, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
