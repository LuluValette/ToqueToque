import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import {Ingredient} from '../models/ingredient.model';
import {Recipe} from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string) : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getRecipes(): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes`);
  }

  getFriendsByUserId(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/friends/${userId}`);
  }

  getFriendsRequestByUserIDd(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/friends_request/${userId}`);
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/foods`);
  }

  createPartie(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sessions`, payload);
  }

  joinPartie(partieId: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sessions/${partieId}/join`, payload);
  }

  updateUserInfo(userId: string, data: { name: string; phone: string; password: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, data);
  }

  addFriendRequest(currentUserId: string, targetUserId: string) {
    return this.http.post(`${this.apiUrl}/users/friends_request/${currentUserId}`, {
      targetId: targetUserId
    });
  }

  acceptFriendRequest(currentUserId: string, targetUserId: string) {
    return this.http.put(`${this.apiUrl}/users/friends_request/${currentUserId}`, {
      targetId: targetUserId
    });
  }

  deleteFriend(userId: string, friendId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/friends/${userId}`, {
      body: { friendId }
    });
  }

  // api.service.ts
  getUserParties(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/sessions`);
  }

  getInvitations(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/sessions/${userId}/invitations`);
  }

  getSessionInfo(sessionId: string) {
    return this.http.get<any>(`${this.apiUrl}/sessions/${sessionId}`);
  }

  getParticipantsSession(sessionId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/sessions/${sessionId}/users`);
  }

  acceptInvitation(sessionId: string, userId: string) {
    return this.http.put(`${this.apiUrl}/sessions/${sessionId}/accept`, {
      userId : userId
    });
  }

  declineInvitation(sessionId: string, userId: string) {
    return this.http.put(`${this.apiUrl}/sessions/${sessionId}/reject`, {
      userId : userId
    });
  }

  lauchSession(sessionId: string) {
    return this.http.put(`${this.apiUrl}/sessions/${sessionId}/launch`, {});
  }

  finishSession(sessionId: string) {
    return this.http.put(`${this.apiUrl}/sessions/${sessionId}/finish`, {});
  }

}
