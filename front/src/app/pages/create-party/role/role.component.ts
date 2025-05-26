import { Component, Input } from '@angular/core';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-role',
  imports: [
    ButtonComponent,
    TextComponent,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  @Input() question: string = 'Veux tu cuisiner lors de cette partie ?';
  user: User | null = null;

  constructor(
    private partieBuilder: PartieBuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.partieBuilder.checkInitiatorOrRedirect();

    const userIdSelected: string = <string>this.route.snapshot.paramMap.get('id');

    this.api.getUserById(userIdSelected).subscribe(user => {
      this.user = user;
      this.createQuestion();
    });

  }

  // Fonction pour crée la question
  createQuestion() {
    const partie = this.partieBuilder.getAll();
    // On vérifie que la liste des participants n'est pas vide
    if (partie.participants.length >= 1) {
      console.log()
      if (this.user) {
        this.question = this.user.name + " doit-il être cuisinier ?";
      }
      return;
    }
  }

  // Fonction pour ajouter un participant avec son rôle
  addParticipant(role: string) {
    this.partieBuilder.addParticipant(this.user, role);
    console.log("User : " + this.user)

    // On redirige vers la page de selection des participants
    this.router.navigate(['/create-party/participant']);
  }
}
