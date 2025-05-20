import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesIngredientsComponent } from './recettes-ingredients.component';

describe('RecettesIngredientsComponent', () => {
  let component: RecettesIngredientsComponent;
  let fixture: ComponentFixture<RecettesIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecettesIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
