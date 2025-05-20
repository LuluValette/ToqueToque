import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../.././components/button/button.component';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonComponent,
    RecetteComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
