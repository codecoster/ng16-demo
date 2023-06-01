import { TestBed } from '@angular/core/testing';
import { UserInfoService } from './user-info/user-info.service';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UserInfoService, useValue: {}}]
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
