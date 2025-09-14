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
    ButtonComponent,
    TextComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  phone = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  handleLogin() {
    if(this.phone == "" || this.password == ""){
      if(this.phone == ""){
        alert('Formulaire vide');
      }
      return;
    }

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
