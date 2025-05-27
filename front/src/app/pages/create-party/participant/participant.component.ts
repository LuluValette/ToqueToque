import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';
import { CardWithTinyIconComponent } from '../../../components/card/card-with-tiny-icon/card-with-tiny-icon.component';
import { ApiService } from '../../../services/api.service';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [
    CommonModule,
    CardWithButtonComponent,
    CardWithTinyIconComponent,
    TextComponent,
    ButtonComponent
  ],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent implements OnInit {
  participants: any[] = [];
  userNames: { [userId: string]: string } = {}; // clé en string pour correspondre à userId

  constructor(
    private auth: AuthService,
    private router: Router,
    private partieBuilder: PartieBuilderService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    this.participants = this.partieBuilder.get('participants');

    this.participants.forEach(participant => {
      if (participant.userId != null){
        this.api.getUserById(participant.userId).subscribe(user => {
          this.userNames[participant.userId] = user.name;
        });
      }
    });
  }

  gotoParticipant() {
    this.router.navigate(['/create-party/recherche-participant']);
  }

  gotoaliment() {
    if (this.participants.length < 2) {
      alert("Vous devez avoir au moins 2 participants pour continuer.");
      return;
    }

    // on redirige vers la page de sélection des aliments
    this.router.navigate(['/create-party/transition']);
  }

  removeParticipant(userId: string) {
    if (this.auth.getUser()._id === userId) {
      alert("Vous ne pouvez pas vous retirer de la partie en cours.");
      return;
    }

    this.partieBuilder.removeParticipant(userId);
    this.participants = this.partieBuilder.get('participants');
    console.log(this.participants)
    // On met à jour la liste des participants
    this.ngOnInit();
  }
}
