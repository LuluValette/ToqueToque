import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RecetteService } from '../../services/recette.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../../components/text/text.component';

@Component({
  selector: 'app-recettes-preparation',
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent
  ],
  templateUrl: './recettes-preparation.component.html',
  styleUrl: './recettes-preparation.component.css'
})
export class RecettesPreparationComponent {
  recette: any;

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recetteService.getRecipeById(id).subscribe((data: any) => {
        this.recette = data;
      });
    }
  }
}
