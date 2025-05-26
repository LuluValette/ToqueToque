import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aliment',
  imports: [
    CommonModule,
    TextComponent,
    ButtonComponent,
    CardWithButtonComponent
  ],
  templateUrl: './aliment.component.html',
  styleUrl: './aliment.component.css'
})
export class AlimentComponent {
  ingredients: any[] = [];

  constructor(
    private router: Router,
    private partieBuilder: PartieBuilderService
  ) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    this.ingredients = this.partieBuilder.get('ingredients') || [];

    console.log("liste des ingrédients : " + this.ingredients.length)
  }

  removeIngredient(ingredientId: string): void {
    this.ingredients = this.ingredients.filter(i => i.id !== ingredientId);
    this.partieBuilder.set('ingredients', this.ingredients);
  }

  gotoRechercheIngredient(): void {
    this.router.navigate(['/create-party/recherche-aliment']);
  }

  gotoRecapitulatif(): void {
    this.router.navigate(['/create-party/recapitulatif']);
  }
}
