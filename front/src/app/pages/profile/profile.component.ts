import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {TextComponent} from '../../components/text/text.component';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    TextComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  form = {
    username: '',
    phone: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.form.username = this.auth.getUser()?.name || '';
    this.form.phone = this.auth.getUser()?.phone || '';
    this.form.password = '';
  }

  logout(): void {
    this.auth.logout();
    window.location.reload(); // Reload the page to reset the state
  }

  goToFriends(): void {
    this.router.navigate(['/friends']);
  }

  submit(): void {
    const payload = {
      name: this.form.username,
      phone: this.form.phone,
      password: this.form.password
    };

    this.api.updateUserInfo(this.auth.getUser()._id, payload).subscribe({
      next: () => {
        alert('Utilisateur mis à jour')
        this.api.updateUserInfo(this.auth.getUser()._id, payload).subscribe({
          next: () => {
            this.auth.updateUserInfo({
              name: this.form.username,
              phone: this.form.phone
            });
          }
        });
      },
      error: err => alert('Erreur lors de la mise à jour : '+ err)
    });
  }
}
