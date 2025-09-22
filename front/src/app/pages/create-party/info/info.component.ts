import {Component, Input} from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-info',
  imports: [
    InputComponent,
    ButtonComponent,
    TextComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() date: string = "";
  @Input() heure: string = "";
  user: any = null;

  constructor(private auth: AuthService, private partieBuilder: PartieBuilderService, private router: Router) {}

  ngOnInit() {
    this.partieBuilder.checkInitiatorOrRedirect();
    this.user = this.auth.getUser();
    this.date = this.partieBuilder.get('date');
    this.heure = this.partieBuilder.get('heure');

    this.partieBuilder.set('initiator', this.user._id);
  }

  nextStep() {
    if (this.date === "" || this.heure === "" || this.date === null || this.heure === null) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    this.partieBuilder.set('date', this.date);
    this.partieBuilder.set('heure', this.heure);

    // On redirige vers la page suivante
    this.router.navigate(['/create-party/role', this.user._id]);
  }
}
