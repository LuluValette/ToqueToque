import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationInfoComponent } from './invitation-info.component';

describe('InvitationInfoComponent', () => {
  let component: InvitationInfoComponent;
  let fixture: ComponentFixture<InvitationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
