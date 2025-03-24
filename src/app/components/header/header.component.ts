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
  template: `
    <header>
      <img src="/assets/logo.png" alt="logo" />
      <h1>API-POKEMON</h1>
      <button (click)="goToAbout()">Sobre el Proyecto</button>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background-color: #f0f0f0;
    }
    img {
      max-height: 150px;
    }
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  @Output() navigate: EventEmitter<NavigationEvent> = new EventEmitter<NavigationEvent>();

  goToAbout(): void {
    this.navigate.emit({ view: 'about' });
  }
}
