import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { RecettesIngredientsComponent } from './pages/recettes-ingredients/recettes-ingredients.component';
import { RecettesPreparationComponent } from './pages/recettes-preparation/recettes-preparation.component';
import { InfoComponent } from './pages/create-party/info/info.component';
import { RoleComponent } from './pages/create-party/role/role.component';
import {LoginComponent} from './pages/login/login.component';
import {ParticipantComponent} from './pages/create-party/participant/participant.component';
import {
  RechercheParticipantComponent
} from './pages/create-party/recherche-participant/recherche-participant.component';
import {TransitionComponent} from './pages/create-party/transition/transition.component';
import {AlimentComponent} from './pages/create-party/aliment/aliment.component';
import {RechercheAlimentComponent} from './pages/create-party/recherche-aliment/recherche-aliment.component';
import {RecapitulatifComponent} from './pages/create-party/recapitulatif/recapitulatif.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {FriendListComponent} from './pages/friend-list/friend-list.component';
import {SearchFriendsComponent} from './pages/search-friends/search-friends.component';
import {InvitationPartyComponent} from './pages/invitation-party/invitation-party.component';
import {InvitationInfoComponent} from './pages/invitation-info/invitation-info.component';
import {PartyInfoComponent} from './pages/party-info/party-info.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'friends', component: FriendListComponent },
    { path: 'search-friends', component: SearchFriendsComponent },
    { path: 'invitation-party', component: InvitationPartyComponent},
    { path: 'invitation/:id', component: InvitationInfoComponent},

    { path: 'recettes', component: RecettesComponent },
    { path: 'recettes/:id', component: RecettesIngredientsComponent },
    { path: 'recettes/preparation/:id', component: RecettesPreparationComponent },

    { path: 'create-party', component: InfoComponent },
    { path: 'create-party/role/:id', component: RoleComponent },
    { path: 'create-party/participant', component: ParticipantComponent },
    { path: 'create-party/recherche-participant', component: RechercheParticipantComponent },
    { path: 'create-party/transition', component: TransitionComponent },
    { path: 'create-party/aliment', component: AlimentComponent },
    { path: 'create-party/recherche-aliment', component: RechercheAlimentComponent },
    { path: 'create-party/recapitulatif', component: RecapitulatifComponent },

    { path: 'party/:id', component: PartyInfoComponent}

];
