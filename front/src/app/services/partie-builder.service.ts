import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PartieBuilderService {
  private partieData: any = {
    date: null,
    heure: null,
    info: '',
    initiator: null,
    participants: [],
    ingredients: [],

    selectedPlayer: null,
  };

  constructor(private router: Router) {}

  set<K extends keyof typeof this.partieData>(key: K, value: typeof this.partieData[K]) {
    this.partieData[key] = value;
  }

  get<K extends keyof typeof this.partieData>(key: K) {
    return this.partieData[key];
  }

  getAll() {
    return this.partieData;
  }

  reset() {
    this.partieData = {
      date: null,
      heure: null,
      info: '',
      initiator: null,
      participants: [],
      ingredients: [],
    };
  }

  checkInitiatorOrRedirect(): void {
    if (!this.partieData.initiator) {
      this.router.navigate(['/']); // Redirection vers la page d'accueil
    }
  }

  addParticipant(user: User | null, role: string) {
    this.partieData.participants.push({ user, role });
  }

  removeParticipant(userId: string): void {
    const participants = this.partieData['participants'] || [];
    this.partieData['participants'] = participants.filter(
      (participant: any) => participant.user._id !== userId
    );
  }

  countCuisiniers(): number {
    const participants = this.get('participants') || [];
    return participants.filter((p: { role: string; }) => p.role === 'cuisinier').length;
  }

  countParticipantsSansInitiator(): number {
    const participants = this.get('participants') || [];
    const initiatorId = this.get('initiator');
    return participants.filter((p: { userId: string }) => p.userId !== initiatorId).length;
  }

  addIngredient(ingredient: any): void {
    const ingredients = this.partieData.ingredients || [];

    const exists = ingredients.some((i: any) => i._id === ingredient._id);
    if (!exists) {
      ingredients.push(ingredient);
      this.partieData.ingredients = ingredients;
    }
    else {
      alert("L'ingrédient existe déjà dans la liste.");
    }
  }

  removeIngredient(ingredientId: string): void {
    const ingredients = this.partieData.ingredients || [];
    this.partieData.ingredients = ingredients.filter((i: any) => i._id !== ingredientId);
  }

}
