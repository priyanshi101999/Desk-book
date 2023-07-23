import { TestBed } from '@angular/core/testing';

import { UpdateProfileModalService } from './update-profile-modal.service';

describe('UpdateProfileModalService', () => {
  let service: UpdateProfileModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProfileModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
