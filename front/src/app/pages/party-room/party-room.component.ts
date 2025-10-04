import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {CardSimpleComponent} from '../../components/card/card-simple/card-simple.component';
import {TextComponent} from '../../components/text/text.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-party-room',
  imports: [
    CardSimpleComponent,
    TextComponent,
    ButtonComponent
  ],
  templateUrl: './party-room.component.html',
  styleUrl: './party-room.component.css'
})
export class PartyRoomComponent {
  @Input() IngredientsImpose: any = null;
  @Input() inittiatorName: String = "";

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
      this.inittiatorName = data.initiator.name;
    });

    this.api.getParticipantsSession(id).subscribe((data: any) => {
      for (let participant of data) {
        if (user._id == participant.id) {
          this.IngredientsImpose = participant.ingredientImpose;
        }
      }
    });
  }

  goToSalon() {
    this.router.navigate(['/party-ready', this.route.snapshot.paramMap.get('id')]);
  }

}
