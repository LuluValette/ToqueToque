import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-card-with-button',
  imports: [ButtonComponent],
  templateUrl: './card-with-button.component.html',
  styleUrl: './card-with-button.component.css'
})
export class CardWithButtonComponent {
  @Input() image: String = '/picture/user-icon.png';
  @Input() title: String = '';
}
