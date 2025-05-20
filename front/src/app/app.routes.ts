import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { RecettesIngredientsComponent } from './pages/recettes-ingredients/recettes-ingredients.component';
import { RecettesPreparationComponent } from './pages/recettes-preparation/recettes-preparation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'recettes', component: RecettesComponent },
    { path: 'recettes/:id', component: RecettesIngredientsComponent },
    { path: 'recettes/preparation/:id', component: RecettesPreparationComponent },
];
