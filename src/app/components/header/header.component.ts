import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavigationEvent {
  view: 'list' | 'about';
  id?: number;
}

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() navigate: EventEmitter<NavigationEvent> = new EventEmitter<NavigationEvent>();

  goToAbout(): void {
    this.navigate.emit({ view: 'about' });
  }
}
