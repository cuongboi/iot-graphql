import { Test, TestingModule } from '@nestjs/testing';
import { EventActionResolver } from './event-action.resolver';
import { EventActionService } from './event-action.service';

describe('EventActionResolver', () => {
  let resolver: EventActionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventActionResolver, EventActionService],
    }).compile();

    resolver = module.get<EventActionResolver>(EventActionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
