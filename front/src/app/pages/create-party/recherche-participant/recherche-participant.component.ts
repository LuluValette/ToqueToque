import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { TextComponent } from '../../../components/text/text.component';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';
import { InputComponent} from '../../../components/input/input.component';
import { ApiService } from '../../../services/api.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {PartieBuilderService} from '../../../services/partie-builder.service';

@Component({
  selector: 'app-recherche-participant',
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent,
    CardWithButtonComponent,
    InputComponent
  ],
  templateUrl: './recherche-participant.component.html',
  styleUrl: './recherche-participant.component.css'
})
export class RechercheParticipantComponent {
  searchTerm: string = '';
  friends: User[] = [];
  filteredFriends: User[] = [];
  user: any = null;

  constructor(
    private partieBuilder: PartieBuilderService,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    this.user = this.auth.getUser();
    this.api.getFriendsByUserId(this.user._id).subscribe(friends => {
      this.friends = friends;
      this.filteredFriends = [...this.friends];
    });
  }

  filterSuggestions(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredFriends = this.friends.filter(friend =>
      friend.name.toLowerCase().includes(term)
    );
  }

  addFriend(friend: any): void {
    // On redirige vers la page suivante
    this.router.navigate(['/create-party/role', friend._id]);
  }
}
