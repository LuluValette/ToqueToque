import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../.././components/button/button.component';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
import {PopupComponent} from '../../components/popup/popup.component';
import {PopupService} from '../../services/popup/popup.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonComponent,
    RecetteComponent,
    PopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isConnected = false;
  user: any = null;
  parties: any[] = [];
  popupService = new PopupService();

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
          this.popupService.showPopup("Erreur", "Erreur chargement parties");
        }
      });
    }
  }

  createParty() {
    if (!this.user) {
      this.popupService.showPopup("Erreur", "Vous devez être connecté pour créer une partie");
      return;
    }
    // On redirige vers la page suivante
    this.router.navigate(['/create-party']);
  }

  goToParty(id: string) {
    this.router.navigate(['/party', id]);
  }
}
