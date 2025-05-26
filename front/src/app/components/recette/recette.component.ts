import {Component, Input, OnInit} from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { CommonModule } from '@angular/common';
import { CardSimpleComponent } from '../card/card-simple/card-simple.component';
import { get } from 'node:http';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, CardSimpleComponent],
  templateUrl: './recette.component.html',
})
export class RecetteComponent implements OnInit {
  @Input() recettes: Recipe[] | null = null;

  constructor(
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    // Si aucune liste n’est passée en @Input(), on la charge depuis l’API
    if (!this.recettes) {
      console.log('Aucune liste de recettes passée en @Input(), chargement depuis l’API');
      this.recetteService.getRecipes().subscribe((data: any) => {
        this.recettes = data;
      });
    }
    else {
      console.log('Liste de recettes passée en @Input() :', this.recettes);
    }

  }
}
