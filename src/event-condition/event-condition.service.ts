import { Injectable } from '@nestjs/common';
import { CreateEventConditionInput } from './dto/create-event-condition.input';
import { UpdateEventConditionInput } from './dto/update-event-condition.input';
import { EventCondition, EventConditionResource } from './entities/event-condition.entity';

@Injectable()
export class EventConditionService {
  create(createEventConditionInput: CreateEventConditionInput) {
    return 'This action adds a new eventCondition';
  }

  findAll(actionIds: string[] = []) {
    return actionIds.map(actionId => {
      return {
        type_: actionId,
        resource: {
          time_zone: 'vn'
        } as EventConditionResource,
      } as EventCondition;
    })
  }

  findOne(id: string) {
    return {
      type_: id.toString(),
      resource: {
        time_zone: 'vn'
      } as EventConditionResource,
    } as EventCondition;
  }

  update(id: number, updateEventConditionInput: UpdateEventConditionInput) {
    return `This action updates a #${id} eventCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCondition`;
  }
}
