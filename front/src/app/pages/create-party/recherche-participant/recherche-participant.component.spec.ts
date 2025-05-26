import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParticipantComponent } from './recherche-participant.component';

describe('RechercheParticipantComponent', () => {
  let component: RechercheParticipantComponent;
  let fixture: ComponentFixture<RechercheParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
