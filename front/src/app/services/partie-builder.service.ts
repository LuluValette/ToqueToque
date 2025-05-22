import { Injectable } from '@angular/core';

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
}
