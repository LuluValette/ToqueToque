import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../components/input/input.component';
import { TextComponent } from '../../components/text/text.component';
import { ButtonComponent } from '../../components/button/button.component';


@Component({
  selector: 'app-login',
  imports: [
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  phone = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  handleLogin() {
    this.auth.login(this.phone, this.password).subscribe({
      next: user => {
        this.auth.saveUser(user);
        this.router.navigate(['/']); // Redirection vers la home
      },
      error: err => {
        alert('Connexion échouée');
      }
    });
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }
}
