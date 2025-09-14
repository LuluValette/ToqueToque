import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {CardWithButtonComponent} from '../../components/card/card-with-button/card-with-button.component';

@Component({
  selector: 'app-friend-list',
  imports: [
    CommonModule,
    CardWithButtonComponent
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent {
  friends: any[] = [];
  friendsRequest: any[] = [];
  userId: string = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (user) {
      this.userId = user._id;
      this.api.getFriendsByUserId(this.userId).subscribe(friends => {
        this.friends = friends;
      });
      this.api.getFriendsRequestByUserIDd(this.userId).subscribe(friendsRequest => {
        this.friendsRequest = friendsRequest;
      });
    }
  }

  removeFriend(friendId: string): void {
    this.api.deleteFriend(this.userId, friendId).subscribe({
      next: () => {
        this.friends = this.friends.filter(f => f._id !== friendId);
      },
      error: err => {
        console.error('Erreur suppression ami :', err);
      }
    });
  }

  acceptFriend(friendId: string): void{
    this.api.acceptFriendRequest(this.userId, friendId).subscribe({
      next: () => {
        this.friends = this.friends.filter(f => f._id !== friendId);
      },
      error: err => {
        console.error('Erreur acceptation demande d\'ami :', err);
      }
    });
  }
}
