import { Test, TestingModule } from '@nestjs/testing';
import { EventActionService } from './event-action.service';

describe('EventActionService', () => {
  let service: EventActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventActionService],
    }).compile();

    service = module.get<EventActionService>(EventActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
