import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { userNewGuard } from './user-new.guard';

describe('userNewGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
