import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  addParticipant(userId: string, role: string) {
    this.partieData.participants.push({ userId, role });
  }

  removeParticipant(userId: string) {
    this.partieData.participants = this.partieData.participants.filter(
        (participant: { userId: string; }) => participant.userId !== userId
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


}
