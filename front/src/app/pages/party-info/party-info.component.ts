import {Component, Input} from '@angular/core';
import {TextComponent} from '../../components/text/text.component';
import {CardSimpleComponent} from '../../components/card/card-simple/card-simple.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-party-info',
  imports: [
    TextComponent,
    CardSimpleComponent,
    ButtonComponent
  ],
  templateUrl: './party-info.component.html',
  styleUrl: './party-info.component.css'
})
export class PartyInfoComponent {
  @Input() invitationPhrase: String = "";
  @Input() info: String = "";
  @Input() participants: any[] = [];
  @Input() IngredientsImpose: any = null;
  @Input() isInitiator: boolean = false;

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
      if(data.initiator._id == user._id) this.isInitiator = true;
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

  startParty() {

  }

  leaveParty() {

  }
}
