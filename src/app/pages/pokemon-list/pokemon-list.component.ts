import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem, PokemonListResponse } from '../../models/pokemon.model';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Listado de Pokémon</h2>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          [(ngModel)]="searchTerm"
          (keyup.enter)="searchPokemon()"
        />
        <button (click)="searchPokemon()">Buscar</button>
      </div>

      <div class="grid">
        <div class="card" *ngFor="let pokemon of pokemons" (click)="openPokemonDetail(pokemon)">
          <img
            [src]="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + extractId(pokemon.url) + '.png'"
            alt="{{ pokemon.name }}"
          />
          <h3>{{ pokemon.name | titlecase }}</h3>
        </div>
      </div>

      <div class="pagination" *ngIf="!isSearching">
        <button (click)="prevPage()">Anterior</button>
        <button (click)="nextPage()">Siguiente</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    .search-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .search-bar input {
      width: 300px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .search-bar button {
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      border: 1px solid #ccc;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: #007bff;
      color: #fff;
      transition: background 0.3s ease;
    }
    .search-bar button:hover {
      background-color: #0056b3;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .card {
      padding: 0.5rem;
      border: 1px solid #ccc;
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.05);
    }
    .pagination button {
      margin: 0 0.5rem;
    }
  `]
})
export class PokemonListComponent implements OnInit {
  @Output() openDetail = new EventEmitter<number>();

  allPokemons: PokemonListItem[] = [];
  pokemons: PokemonListItem[] = [];

  offset: number = 0;
  limit: number = 24;
  searchTerm: string = '';
  isSearching: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(0, 1281).subscribe((data: PokemonListResponse) => {
      this.allPokemons = data.results;
      this.loadPokemons();
    });
  }

  loadPokemons(): void {
    this.pokemons = this.allPokemons.slice(this.offset, this.offset + this.limit);
  }

  nextPage(): void {
    if (this.offset + this.limit < this.allPokemons.length) {
      this.offset += this.limit;
      this.loadPokemons();
    }
  }

  prevPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  extractId(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }

  openPokemonDetail(pokemon: PokemonListItem): void {
    const id = this.extractId(pokemon.url);
    this.openDetail.emit(id);
  }

  searchPokemon(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.isSearching = true;
      this.pokemons = this.allPokemons.filter(p =>
        p.name.toLowerCase().includes(term)
      );
    } else {
      this.isSearching = false;
      this.offset = 0;
      this.loadPokemons();
    }
  }
}
