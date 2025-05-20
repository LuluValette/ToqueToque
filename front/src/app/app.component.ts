import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(public router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
    });
  }
  title = 'toquetoque';

  ngOnInit() {
    console.log('AppComponent INIT');
  }
}
