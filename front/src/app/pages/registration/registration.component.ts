import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TextComponent} from '../../components/text/text.component';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [
    CommonModule,
    FormsModule,
    TextComponent,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  formData = {
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const payload = {
      name: this.formData.username,
      phone: this.formData.phone,
      password: this.formData.password
    };

    this.auth.registration(payload).subscribe({
      next: user => {
        console.log('Utilisateur inscrit :', user);
        this.auth.setUser(user);
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Erreur d’inscription :', err);
      }
    });
  }

}
