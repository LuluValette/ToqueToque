import {Component, Input} from '@angular/core';
import {TextComponent} from '../text/text.component';

@Component({
  selector: 'app-popup',
  imports: [
    TextComponent
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() open: boolean = false;
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'message';

  closePopup() {
    this.open = false;
  }
}
