import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { CommonModule } from '@angular/common';
import { CardSimpleComponent } from '../card/card-simple/card-simple.component';
import { get } from 'node:http';

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, CardSimpleComponent],
  templateUrl: './recette.component.html',
})
export class RecetteComponent implements OnInit {
  recettes: any[] = [];

  constructor(private recetteService: RecetteService) {}

  ngOnInit() {
    console.log('RecetteComponent INIT');
    this.getRecettes();
  }
  ngOnChanges() {
    console.log('RecetteComponent CHANGES');
  }

  getRecettes() {
    this.recetteService.getRecipes().subscribe((data: any) => {
      this.recettes = data;
    });
  }
}
