import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoginGuard } from './not-login.guard';

describe('NotLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotLoginGuard]
    });
  });

  it('should ...', inject([NotLoginGuard], (guard: NotLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
