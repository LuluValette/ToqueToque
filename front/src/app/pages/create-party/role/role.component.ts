import { Component, Input } from '@angular/core';
import { TextComponent } from '../../../components/text/text.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PartieBuilderService } from '../../../services/partie-builder.service';

@Component({
  selector: 'app-role',
  imports: [
    ButtonComponent,
    TextComponent,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  @Input() question: string = 'Veux tu cuisiner lors de cette partie ?';

  constructor(private partieBuilder: PartieBuilderService) {}

  ngOnInit() {
    const partie = this.partieBuilder.getAll();

  }
}
