import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonId: number | null = null;
  @Output() back = new EventEmitter<void>();
  pokemon: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (this.pokemonId !== null) {
      this.pokemonService.getPokemon(this.pokemonId).subscribe(data => {
        this.pokemon = data;
      });
    }
  }

  goBack(): void {
    this.back.emit();
  }
}
