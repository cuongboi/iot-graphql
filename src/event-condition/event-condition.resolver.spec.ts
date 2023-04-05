import { Test, TestingModule } from '@nestjs/testing';
import { EventConditionResolver } from './event-condition.resolver';
import { EventConditionService } from './event-condition.service';

describe('EventConditionResolver', () => {
  let resolver: EventConditionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventConditionResolver, EventConditionService],
    }).compile();

    resolver = module.get<EventConditionResolver>(EventConditionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
