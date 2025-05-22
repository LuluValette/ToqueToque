import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { RecettesIngredientsComponent } from './pages/recettes-ingredients/recettes-ingredients.component';
import { RecettesPreparationComponent } from './pages/recettes-preparation/recettes-preparation.component';
import { InfoComponent } from './pages/create-party/info/info.component';
import { RoleComponent } from './pages/create-party/role/role.component';
import {LoginComponent} from './pages/login/login.component';
import {ParticipantComponent} from './pages/create-party/participant/participant.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'login', component: LoginComponent },

    { path: 'recettes', component: RecettesComponent },
    { path: 'recettes/:id', component: RecettesIngredientsComponent },
    { path: 'recettes/preparation/:id', component: RecettesPreparationComponent },

    { path: 'create-party', component: InfoComponent },
    { path: 'create-party/role/:id', component: RoleComponent },
    { path: 'create-party/participant', component: ParticipantComponent },
];
