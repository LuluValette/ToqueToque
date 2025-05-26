import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheAlimentComponent } from './recherche-aliment.component';

describe('RechercheAlimentComponent', () => {
  let component: RechercheAlimentComponent;
  let fixture: ComponentFixture<RechercheAlimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheAlimentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
