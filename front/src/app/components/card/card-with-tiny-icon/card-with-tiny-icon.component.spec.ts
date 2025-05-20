import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithTinyIconComponent } from './card-with-tiny-icon.component';

describe('CardWithTinyIconComponent', () => {
  let component: CardWithTinyIconComponent;
  let fixture: ComponentFixture<CardWithTinyIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithTinyIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWithTinyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
