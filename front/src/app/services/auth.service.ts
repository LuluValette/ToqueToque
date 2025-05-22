import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(phone: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { phone, password });
  }

  saveUser(user: any) {
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
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.getUser();
  }
}
