import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { PartieBuilderService } from '../../../services/partie-builder.service';

import { TextComponent } from '../../../components/text/text.component';
import { InputComponent } from '../../../components/input/input.component';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recherche-aliment',
  imports: [
    CommonModule,
    FormsModule,
    TextComponent,
    InputComponent,
    CardWithButtonComponent
  ],
  templateUrl: './recherche-aliment.component.html',
  styleUrl: './recherche-aliment.component.css'
})
export class RechercheAlimentComponent {
  searchTerm: string = '';
  allIngredients: any[] = [];
  filteredIngredients: any[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private partieBuilder: PartieBuilderService
  ) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    this.api.getIngredients().subscribe(ingredients => {
      this.allIngredients = ingredients;
      this.filteredIngredients = ingredients;
    });
  }

  filterIngredients(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredIngredients = this.allIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(term)
    );
  }

  addIngredient(ingredient: any): void {
    const ingredients = this.partieBuilder.get('ingredients') || [];
    const alreadyExists = ingredients.some((i: { _id: any; }) => i._id === ingredient._id);

    if (!alreadyExists) {
      ingredients.push(ingredient);
      this.partieBuilder.set('ingredients', ingredients);
      this.router.navigate(['/create-party/aliment']);
    }
    else{
      alert("L'ingrédient existe déjà dans la liste.");
    }

  }
}
