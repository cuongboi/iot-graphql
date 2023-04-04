import { Injectable } from '@nestjs/common';
import { CreateEventActionInput } from './dto/create-event-action.input';
import { UpdateEventActionInput } from './dto/update-event-action.input';
import { EventAction, EventActionResource } from './entities/event-action.entity';

@Injectable()
export class EventActionService {
  create(createEventActionInput: CreateEventActionInput) {
    return 'This action adds a new eventAction';
  }

  findAll(actionIds: string[] = []) {
    return actionIds.map(actionId => {
      return {
        type_: actionId,
        resource: {
          recipients: ['u1@gg.com', 'u2@gg.com'],
          subject: 'subject1',
          content: 'content1',
        } as EventActionResource,
      } as EventAction;
    })
  }

  findOne(id: number) {
    return {
      type_: 'type_',
      resource: {
        recipients: ['u1@gg.com', 'u2@gg.com'],
        subject: 'subject',
        content: 'content',
      } as EventActionResource,
    } as EventAction;
  }

  update(id: number, updateEventActionInput: UpdateEventActionInput) {
    return `This action updates a #${id} eventAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventAction`;
  }
}
