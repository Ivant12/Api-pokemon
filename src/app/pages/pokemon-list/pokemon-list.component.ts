import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem, PokemonListResponse } from '../../models/pokemon.model';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
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
