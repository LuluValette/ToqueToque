import { Component } from '@angular/core';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import {Router} from '@angular/router';
import {PartieBuilderService} from '../../../services/partie-builder.service';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-transition',
  imports: [
    TextComponent,
    ButtonComponent
  ],
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.css'
})
export class TransitionComponent {
  text1: string = "";
  text2: string = "";
  constructor(
    private router: Router,
    private partieBuilder: PartieBuilderService,
  ) {}

  ngOnInit(): void {
    this.partieBuilder.checkInitiatorOrRedirect();
    const countCuisiniers = this.partieBuilder.countCuisiniers();
    const countParticipantsSansInitiator = this.partieBuilder.countParticipantsSansInitiator();

    if (countCuisiniers != countParticipantsSansInitiator)
    {
      this.text1 = "Tu as choisi " + countCuisiniers + " cuisiniers, dont toi";
      this.text2 = "Tu devras donc choisir " + countParticipantsSansInitiator + " aliments, car tu ne peux pas choisir la totalité des aliments quand tu es toi même cuisinier";
    }
    else
    {
      this.text1 = "Tu as choisi " + countCuisiniers + " cuisiniers";
      this.text2 = "Tu peux donc choisir " + countCuisiniers + " aliments";
    }

  }

  gotoAliment() {
    // on redirige vers la page de sélection des aliments
    this.router.navigate(['/create-party/aliment']);
  }

}
