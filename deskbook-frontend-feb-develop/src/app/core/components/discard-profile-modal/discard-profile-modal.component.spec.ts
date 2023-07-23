import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardProfileModalComponent } from './discard-profile-modal.component';

describe('DiscardProfileModalComponent', () => {
  let component: DiscardProfileModalComponent;
  let fixture: ComponentFixture<DiscardProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardProfileModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
