import { Component } from '@angular/core';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { TextComponent } from '../../components/text/text.component';
import { InputComponent} from '../../components/input/input.component';
import {ApiService} from '../../services/api.service';
import {FormsModule} from '@angular/forms';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [
    RecetteComponent,
    TextComponent,
    InputComponent,
    FormsModule
  ],
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.css'
})
export class RecettesComponent {
  searchTerm: string = '';
  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.api.getRecipes().subscribe((recipes: Recipe[]) => {
      this.allRecipes = recipes;
      this.filteredRecipes = recipes;
    });
  }

  searchRecipes(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredRecipes = this.allRecipes.filter(recipe =>
      recipe.title?.toLowerCase().includes(term)

    );
  }
}
