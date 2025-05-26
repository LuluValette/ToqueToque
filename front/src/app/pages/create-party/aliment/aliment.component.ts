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
    this.partieBuilder.removeIngredient(ingredientId);
    this.ngOnInit();
  }

  gotoRechercheIngredient(): void {
    this.router.navigate(['/create-party/recherche-aliment']);
  }

  gotoRecapitulatif(): void {
    // Vérification que la liste des ingrédients n'est pas vide
    if (this.ingredients.length === 0) {
      alert('Veuillez ajouter au moins un ingrédient avant de continuer.');
      return;
    }
    // Vérifie que la liste des ingrédients et cuisinier sont egaux
    const participantCount = this.partieBuilder.countParticipantsSansInitiator();
    if (this.ingredients.length !== participantCount) {
      alert("Le nombre d'ingrédient doit être égal au nombre de cuisinier.");
      return;
    }
    this.router.navigate(['/create-party/recapitulatif']);
  }
}
