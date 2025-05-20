import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../.././components/button/button.component';
import { RecetteComponent } from '../.././components/recette/recette.component';
import { RecetteService } from '../../services/recette.service';
import { CardSimpleComponent } from '../../components/card/card-simple/card-simple.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonComponent,
    RecetteComponent,
    CardSimpleComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recettes: any[] = [];

  constructor(private recetteService: RecetteService, private router: Router) {}

  ngOnInit() {
    console.log('HomeComponent INIT');
    this.getRecettes();
  }
  
  getRecettes() {
    this.recetteService.getRecipes().subscribe((data: any) => {
      this.recettes = data;
    });
  }
  
  ngOnChanges() {
    console.log('HomeComponent CHANGES');
  }
}
