import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() link: string | null = null;

  constructor(private api: ApiService) {}

  @Output() clicked = new EventEmitter<void>();

  get colorClasses(): string {
    switch (this.color) {
      case 'primary': return 'bg-[var(--primary-color)] text-[var(--text-color)] font-bold rounded-[12px] px-8 py-3 shadow-[6px_6px_10px_var(--text-color)]';
      case 'secondary': return 'bg-[var(--secondary-color)] text-[var(--background-color)] font-bold rounded-[12px] px-8 py-3 shadow-[6px_6px_10px_var(--third-color)]';
      case 'danger': return 'bg-[var(--third-color)] text-[var(--text-color)] font-bold rounded-[12px] px-8 py-3 shadow-[6px_6px_10px_var(--primary-color)]';
      default: return 'text-lg-custom bg-blue-600 text-white';
    }
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'small': return 'text-sm-custom';
      case 'medium': return 'text-lg-custom';
      case 'large': return 'text-xl-custom';
      default: return 'text-lg-custom';
    }
  }

  handleClick() {
    this.clicked.emit();
  }
}
