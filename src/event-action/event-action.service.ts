import { Injectable } from '@nestjs/common';
import { CreateEventActionInput } from './dto/create-event-action.input';
import { UpdateEventActionInput } from './dto/update-event-action.input';
import {
  EventAction,
  EventActionResource,
} from './entities/event-action.entity';

@Injectable()
export class EventActionService {
  create(createEventActionInput: CreateEventActionInput) {
    return 'This action adds a new eventAction';
  }

  async findAll(eventId: string) {
    return (await api.eventAction.findAll({ eventId })).data.data.map((e) =>
      EventAction.from(e),
    );
  }

  async findOne(eventId: string, actionId: string) {
    return EventAction.from(
      (await api.eventAction.findOne({ eventId, actionId })).data.data,
    );
  }

  update(id: number, updateEventActionInput: UpdateEventActionInput) {
    return `This action updates a #${id} eventAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventAction`;
  }
}
