import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <footer>
      <p>Iván Navarro Roldán - 2DAW</p>
      <button (click)="goToList()">Listado de Pokémon</button>
    </footer>
  `,
  styles: [`
    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background-color: #f0f0f0;
    }
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `]
})
export class FooterComponent {
  @Output() navigate = new EventEmitter<{ view: 'list' | 'about', id?: number }>();

  goToList(): void {
    this.navigate.emit({ view: 'list' });
  }
}
