import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonSpecies, FlavorTextEntry } from '../../models/pokemon.model';

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

  pokemon!: Pokemon;
  description: string = 'Cargando descripción...'; // Propiedad declarada correctamente

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (this.pokemonId !== null) {
      this.pokemonService.getPokemon(this.pokemonId).subscribe((data: Pokemon) => {
        this.pokemon = data;
        this.loadSpeciesDescription(this.pokemon.id);
      });
    }
  }

  goBack(): void {
    this.back.emit();
  }

  loadSpeciesDescription(id: number): void {
    this.pokemonService.getPokemonSpecies(id).subscribe((speciesData: PokemonSpecies) => {
      const flavorEntries = speciesData.flavor_text_entries;
      const entry = flavorEntries.find((e: FlavorTextEntry) => e.language.name === 'es')
                  || flavorEntries.find((e: FlavorTextEntry) => e.language.name === 'en');
      if (entry) {
        this.description = entry.flavor_text.replace(/[\n\f]/g, ' ');
      } else {
        this.description = 'Descripción no disponible.';
      }
    }, error => {
      this.description = 'Error al cargar la descripción.';
    });
  }

  getTypeClass(typeName: string): string {
    return `type-${typeName.toLowerCase()}`;
  }
}
