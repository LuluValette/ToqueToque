import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {TextComponent} from '../../components/text/text.component';
import {CardSimpleComponent} from '../../components/card/card-simple/card-simple.component';
import {AuthService} from '../../services/auth.service';
import {Ingredient} from '../../models/ingredient.model';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-invitation-info',
  imports: [
    TextComponent,
    CardSimpleComponent,
    ButtonComponent
  ],
  templateUrl: './invitation-info.component.html',
  styleUrl: './invitation-info.component.css'
})
export class InvitationInfoComponent {
  @Input() invitationPhrase: String = "";
  @Input() info: String = "";
  @Input() participants: any[] = [];
  @Input() IngredientsImpose: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const user = this.auth.getUser();

    this.api.getSessionInfo(id).subscribe((data: any) => {
      this.invitationPhrase = data.initiator.name + " vous invite à rejoindre une partie de le " + new Date(data.date).toLocaleDateString() + " à " + new Date(data.heure).toLocaleTimeString();
      this.info = data.info;
    });

    this.api.getParticipantsSession(id).subscribe((data: any) => {
      this.participants = data;
      for (let participant of this.participants) {
        if (user._id == participant.id) {
          this.IngredientsImpose = participant.ingredientImpose;
        }
      }
      });
  }

  acceptInvitation() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const user = this.auth.getUser();

    this.api.acceptInvitation(id, user._id).subscribe({
      next: (_data) => {
        alert('Invitation acceptée !');
        this.router.navigate(['/party', id]);
      }
    });
  }

  rejectInvitation() {

  }


}
