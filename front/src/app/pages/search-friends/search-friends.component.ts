import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { InputComponent } from '../../components/input/input.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CardWithButtonComponent} from '../../components/card/card-with-button/card-with-button.component';
import {AuthService} from '../../services/auth.service';
import {map, tap} from 'rxjs';

@Component({
  selector: 'app-search-friends',
  imports: [
    InputComponent,
    FormsModule,
    CommonModule,
    CardWithButtonComponent
  ],
  templateUrl: './search-friends.component.html',
  styleUrl: './search-friends.component.css'
})
export class SearchFriendsComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    const user = this.auth.getUser();
    if(user == null) {
      console.error('here User not logged in');
      return;
    }
    const exclude = new Set<string>();
    exclude.add(this.auth.getUser()._id)

    // On attend que les deux appels soient terminés
    const [friends, users] = await Promise.all([
        this.api.getFriendsByUserId(this.auth.getUser()._id),
        this.api.getUsers()
    ]);

    friends.subscribe(frs => {
      frs.forEach((f: any) => exclude.add(String(f._id)));

      users.subscribe(
        usrs => {
          this.users = usrs.filter(u => !exclude.has(String(u._id)));
        }
      );
    });

  }

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.phone.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }

  sendFriendRequest(targetUserId: string) {
    this.api.addFriendRequest(this.auth.getUser()._id, targetUserId).subscribe({
      next: () => alert('Demande envoyée !'),
      error: err => alert('Erreur : ' + (err.error?.error || 'inconnue'))
    });
  }
}
