import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  @Input() text: string = 'Default Text';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get sizeClasses(): string {
    switch (this.size) {
      case 'small': return 'text-sm-custom';
      case 'medium': return 'text-lg-custom';
      case 'large': return 'text-xl-custom';
      default: return 'text-lg-custom';
    }
  }
}
