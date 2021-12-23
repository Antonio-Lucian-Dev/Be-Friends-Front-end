import { TestBed } from '@angular/core/testing';

import { BeFriendsGuard } from './be-friends.guard';

describe('BeFriendsGuard', () => {
  let guard: BeFriendsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BeFriendsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
