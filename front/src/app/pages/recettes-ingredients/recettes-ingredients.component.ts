import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from '../../services/recette.service';
import { TextComponent } from '../../components/text/text.component';
import { ButtonComponent } from '../.././components/button/button.component';

@Component({
  selector: 'app-recettes-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    ButtonComponent
  ],
  templateUrl: './recettes-ingredients.component.html',
  styleUrl: './recettes-ingredients.component.css'
})
export class RecettesIngredientsComponent {
  recette: any;
  ingredients: any[] = [];

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recetteService.getIngredientsByRecipeId(id).subscribe((data: any) => {
        this.ingredients = data;
      });
      this.recetteService.getRecipeById(id).subscribe((data: any) => {
        this.recette = data;
      });
    }
  }
}
