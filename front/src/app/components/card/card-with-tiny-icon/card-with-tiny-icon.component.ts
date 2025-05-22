import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-card-with-tiny-icon',
  imports: [ButtonComponent],
  templateUrl: './card-with-tiny-icon.component.html',
  styleUrl: './card-with-tiny-icon.component.css'
})
export class CardWithTinyIconComponent {
  @Input() image: String = '/picture/user-icon.png';
  @Input() tiny_icon: String = '/picture/user-icon.png';
  @Input() title: String = '';

  @Input() buttonLabel: string = 'Valider';
  @Input() buttonColor: string = 'primary';
  @Input() buttonSize: string = 'medium';

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }
}
