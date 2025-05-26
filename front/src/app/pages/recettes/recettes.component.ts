import { Component } from '@angular/core';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { TextComponent } from '../../components/text/text.component';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [
    RecetteComponent,
    TextComponent
  ],
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.css'
})
export class RecettesComponent {
}
