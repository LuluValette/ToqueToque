import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`);
  }

  getRecipeById(id: string) {
    return this.http.get(`${this.apiUrl}/recipes/${id}`);
  }

  getIngredientsByRecipeId(id: string) {
    return this.http.get(`${this.apiUrl}/recipes/${id}/foods`);
  }
}
