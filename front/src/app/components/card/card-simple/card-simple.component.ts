import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-simple',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-simple.component.html',
  styleUrl: './card-simple.component.css'
})
export class CardSimpleComponent {
  @Input() image: String = '/picture/user-icon.png';
  @Input() title: String = '';
  @Input() link: any[] = [];
}
