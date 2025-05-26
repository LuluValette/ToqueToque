import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import {Ingredient} from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: string) : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`);
  }

  getFriendsByUserId(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/friends/${userId}`);
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/foods`);
  }


}
