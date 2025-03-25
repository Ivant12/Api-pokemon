import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() navigate = new EventEmitter<{ view: 'list' | 'about', id?: number }>();

  goToList(): void {
    this.navigate.emit({ view: 'list' });
  }
}
