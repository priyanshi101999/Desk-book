import { TestBed } from '@angular/core/testing';

import { UserProfileOverlayService } from './user-profile-overlay.service';

describe('UserProfileOverlayService', () => {
  let service: UserProfileOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
