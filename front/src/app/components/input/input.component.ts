import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = 'Label';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() required: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
}
