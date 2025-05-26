import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-card-with-button',
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './card-with-button.component.html',
  styleUrl: './card-with-button.component.css'
})
export class CardWithButtonComponent {
  @Input() image: String = '/picture/user-icon.png';
  @Input() title: String = '';

  @Input() buttonLabel: string = 'Valider';
  @Input() buttonColor: string = 'primary';
  @Input() buttonSize: string = 'medium';

  @Output() buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }
}
