import { Component, Input } from '@angular/core';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

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

  constructor(private partieBuilder: PartieBuilderService, private router: Router,private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const partie = this.partieBuilder.getAll();

    const userIdSelected: string = <string>this.route.snapshot.paramMap.get('id');

    // On vérifie que la liste des participants n'est pas vide
    if (partie.participants.length >= 1) {
      // On récupère les informations de l'utilisateur via l'id
      this.api.getUserById(userIdSelected).subscribe(user => {
        this.question = user.name + " doit-il être cuisinier ?"
      });
      return;
    }
  }

  // Fonction pour ajouter un participant avec son rôle
  addParticipant(role: string) {
    console.log("role : ", role);
    const userIdSelected: string = <string>this.route.snapshot.paramMap.get('id');
    this.partieBuilder.addParticipant(userIdSelected, role);

    // On redirige vers la page de selection des participants
    this.router.navigate(['/create-party/participant']);
  }
}
