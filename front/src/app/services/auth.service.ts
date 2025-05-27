import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import {User} from '../models/user.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(phone: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { phone, password });
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any | null {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      try {
        return JSON.parse(localStorage.getItem('user')!);
      } catch (e) {
        console.error('Erreur de parsing localStorage user:', e);
        return null;
      }
    }
    return null;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.getUser();
  }

  updateUserInfo(data: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      this.setUser(updatedUser);
    }
  }
}
