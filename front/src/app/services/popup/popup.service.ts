import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private open: boolean = false;
  private title: string = 'Confirmation';
  private message: string = 'message';

  showPopup(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.open = true;
  }

  isOpen(): boolean {
    return this.open;
  }

  getTitle(): string {
    return this.title;
  }

  getMessage(): string {
    return this.message;
  }

  constructor() { }
}
