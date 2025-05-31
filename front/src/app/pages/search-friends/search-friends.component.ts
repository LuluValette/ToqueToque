import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { InputComponent } from '../../components/input/input.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CardWithButtonComponent} from '../../components/card/card-with-button/card-with-button.component';
import {AuthService} from '../../services/auth.service';

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

  ngOnInit(): void {
    this.api.getUsers().subscribe(users => {
      this.filteredUsers = users;

    });
    console.log(this.filteredUsers);
  }

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
      );
    }
  }

  sendFriendRequest(targetUserId: string) {
    this.api.addFriend(this.auth.getUser()._id, targetUserId).subscribe({
      next: () => alert('Demande envoyée !'),
      error: err => alert('Erreur : ' + (err.error?.error || 'inconnue'))
    });
  }
}
