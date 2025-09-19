import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  menuUserOpen: boolean = false;
  user: any = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated(); // ou observable si nécessaire
    if(this.isLoggedIn){
      this.user = this.auth.getUser();
    }
  }

  toggleMenuUser(): void{
    if (this.isLoggedIn){
      this.menuUserOpen = !this.menuUserOpen;
    }else {
      this.router.navigate(['/login']);
    }
  }

  closeMenuUser(): void{
    this.menuUserOpen = false;
  }

  logout(): void {
    this.auth.logout();
    window.location.reload(); // Reload the page to reset the state
  }

  goToMainPage(): void {
    this.router.navigate(['/']);
    this.closeMenuUser();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenuUser();
  }

  goToFriends(): void {
    this.router.navigate(['/friends']);
    this.closeMenuUser();
  }

  goToSearchFriends(): void {
    this.router.navigate(['/search-friends']);
    this.closeMenuUser();
  }

  goToInvitation(): void {
    this.closeMenuUser();
  }
}
