import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPartyComponent } from './invitation-party.component';

describe('InvitationPartyComponent', () => {
  let component: InvitationPartyComponent;
  let fixture: ComponentFixture<InvitationPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationPartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
