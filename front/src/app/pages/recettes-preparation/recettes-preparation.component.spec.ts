import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesPreparationComponent } from './recettes-preparation.component';

describe('RecettesPreparationComponent', () => {
  let component: RecettesPreparationComponent;
  let fixture: ComponentFixture<RecettesPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecettesPreparationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
