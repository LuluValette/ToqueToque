import { Component } from '@angular/core';
import {TextComponent} from "../../components/text/text.component";
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-party-ready',
  imports: [
    TextComponent,
    ButtonComponent
  ],
  templateUrl: './party-ready.component.html',
  styleUrl: './party-ready.component.css'
})
export class PartyReadyComponent {

}
