import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../.././components/button/button.component';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user) {
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
