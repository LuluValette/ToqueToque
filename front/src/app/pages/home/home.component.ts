import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../.././components/button/button.component';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonComponent,
    RecetteComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isConnected = false;
  user: any = null;
  parties: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user != null) {
      this.api.getUserParties(this.auth.getUser()._id).subscribe({
        next: (data) => {
          this.parties = data;
        },
        error: (err) => {
          console.error('Erreur chargement parties', err);
        }
      });
    }
  }

  createParty() {
    if (!this.user) {
      alert("Vous devez être connecté pour créer une partie");
    }
    // On redirige vers la page suivante
    this.router.navigate(['/create-party']);
  }
}
