import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {CardWithButtonComponent} from '../../components/card/card-with-button/card-with-button.component';

@Component({
  selector: 'app-invitation-party',
  imports: [
    CardWithButtonComponent
  ],
  templateUrl: './invitation-party.component.html',
  styleUrl: './invitation-party.component.css'
})
export class InvitationPartyComponent {
  invitations: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    this.api.getInvitations(user._id).subscribe(invitations => {
      this.invitations = invitations;
    });
  }

  viewInvitation(invitationId: string) {
    this.router.navigate(['/invitation', invitationId]);
  }

}
