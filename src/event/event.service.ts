import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  create(createEventInput: CreateEventInput) {
    return 'This action adds a new event';
  }

  async findAll(organizationId: string) {
    return (
      await api.event.findAll({ organization_id: organizationId })
    ).data.data.map((e) => Event.from(e));
  }

  async findOne(eventId: string) {
    return Event.from((await api.event.findOne({ eventId })).data.data);
  }

  update(id: number, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
