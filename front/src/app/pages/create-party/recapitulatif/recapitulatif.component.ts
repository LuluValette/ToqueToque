import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';

@Component({
  selector: 'app-recapitulatif',
  imports: [
    CommonModule,
    TextComponent,
    ButtonComponent,
    CardWithButtonComponent
  ],
  templateUrl: './recapitulatif.component.html',
  styleUrl: './recapitulatif.component.css'
})
export class RecapitulatifComponent {
  date: string = '';
  heure: string = '';
  participants: any[] = [];
  ingredients: any[] = [];

  constructor(private partieBuilder: PartieBuilderService) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    const partie = this.partieBuilder.getAll();
    this.date = partie.date;
    this.heure = partie.heure;
    this.participants = partie.participants || [];
    this.ingredients = partie.ingredients || [];
    console.log("Liste des participants :", this.participants);
  }

  getIngredientAttribue(userId: string): any {
    return this.ingredients.find((i: any) => i.assignedTo === userId);
  }

  getUserName(userId: string): string {
    // À adapter selon la façon dont les noms sont gérés dans ton app
    if (userId === this.partieBuilder.get('initiator')) return 'Toi';
    return userId;
  }

  supprimerParticipant(userId: string): void {
    this.partieBuilder.removeParticipant(userId);
    this.participants = this.participants.filter(p => p.userId !== userId);
  }

  supprimerIngredient(ingredientId: string): void {
    this.ingredients = this.ingredients.filter(i => i._id !== ingredientId);
    this.partieBuilder.set('ingredients', this.ingredients);
  }

  lancerPartie(): void {
    console.log('Partie lancée !');
    // Ajoute ici la logique de validation/navigation
  }
}
