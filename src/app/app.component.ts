import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, NavigationEvent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { AboutComponent } from './pages/about/about.component';

export type ViewType = 'list' | 'detail' | 'about';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    AboutComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-pokemon';

  currentView: ViewType = 'list';
  selectedPokemonId: number | null = null;

  changeView(view: ViewType, id?: number): void {
    this.currentView = view;
    if (id !== undefined) {
      this.selectedPokemonId = id;
    }
  }

  onNavigate(event: any): void {
    const navEvent = event as NavigationEvent;
    this.changeView(navEvent.view, navEvent.id);
  }
}
