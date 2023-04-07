import { Test, TestingModule } from '@nestjs/testing';
import { EventConditionService } from './event-condition.service';

describe('EventConditionService', () => {
  let service: EventConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventConditionService],
    }).compile();

    service = module.get<EventConditionService>(EventConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
