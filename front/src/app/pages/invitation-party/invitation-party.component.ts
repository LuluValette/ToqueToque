import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-invitation-party',
  imports: [],
  templateUrl: './invitation-party.component.html',
  styleUrl: './invitation-party.component.css'
})
export class InvitationPartyComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
  }

}
