import { TestBed } from '@angular/core/testing';

import { RegisteredUsersService } from './registered-users.service';

describe('RegisteredUsersService', () => {
  let service: RegisteredUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
