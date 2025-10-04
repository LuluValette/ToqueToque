import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreNotationComponent } from './pre-notation.component';

describe('PreNotationComponent', () => {
  let component: PreNotationComponent;
  let fixture: ComponentFixture<PreNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreNotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
