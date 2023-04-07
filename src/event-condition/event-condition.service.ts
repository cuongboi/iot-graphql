import { Injectable } from '@nestjs/common';
import { CreateEventConditionInput } from './dto/create-event-condition.input';
import { UpdateEventConditionInput } from './dto/update-event-condition.input';
import {
  EventCondition,
  EventConditionResource,
} from './entities/event-condition.entity';

@Injectable()
export class EventConditionService {
  create(createEventConditionInput: CreateEventConditionInput) {
    return 'This action adds a new eventCondition';
  }

  async findAll(eventId: string) {
    return (await api.eventCondition.findAll({ eventId })).data.data.map((e) =>
      EventCondition.from(e),
    );
  }

  async findOne(eventId: string) {
    return EventCondition.from(
      (await api.eventCondition.findOne({ eventId })).data.data,
    );
  }

  update(id: number, updateEventConditionInput: UpdateEventConditionInput) {
    return `This action updates a #${id} eventCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCondition`;
  }
}
