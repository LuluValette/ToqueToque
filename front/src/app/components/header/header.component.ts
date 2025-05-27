import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated(); // ou observable si nécessaire
  }
}
