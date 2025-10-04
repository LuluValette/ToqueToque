import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyReadyComponent } from './party-ready.component';

describe('PartyReadyComponent', () => {
  let component: PartyReadyComponent;
  let fixture: ComponentFixture<PartyReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyReadyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
