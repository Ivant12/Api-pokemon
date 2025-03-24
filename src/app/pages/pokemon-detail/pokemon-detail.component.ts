import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonSpecies, FlavorTextEntry } from '../../models/pokemon.model';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  template: `
    <div class="detail-container" *ngIf="pokemon">
      <div class="detail-header">
        <h2>
          {{ pokemon.name | titlecase }}
          <span class="pokemon-id">N.° {{ pokemon.id }}</span>
        </h2>
      </div>

      <div class="detail-body">
        <div class="pokemon-image">
          <img [src]="pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default"
               alt="{{ pokemon.name }}" />
        </div>

        <div class="pokemon-info">
          <p class="description">
            {{ description }}
          </p>

          <div class="stats-container">
            <div class="stat">
              <strong>Altura</strong>
              <span>{{ pokemon.height / 10 }} m</span>
            </div>
            <div class="stat">
              <strong>Peso</strong>
              <span>{{ pokemon.weight / 10 }} kg</span>
            </div>
            <div class="stat">
              <strong>Exp Base</strong>
              <span>{{ pokemon.base_experience }}</span>
            </div>
          </div>

          <div class="types" *ngIf="(pokemon?.types?.length ?? 0) > 0">
            <strong>Tipo</strong>
            <div class="type-badges">
              <span class="type-badge"
                    *ngFor="let t of pokemon.types"
                    [ngClass]="getTypeClass(t.type.name)">
                {{ t.type.name | titlecase }}
              </span>
            </div>
          </div>

          <div class="abilities" *ngIf="(pokemon?.abilities?.length ?? 0) > 0">
            <strong>Habilidades</strong>
            <ul>
              <li *ngFor="let ability of pokemon.abilities">
                {{ ability.ability.name | titlecase }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button class="back-btn" (click)="goBack()">Volver al listado</button>
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 900px;
      margin: 2rem auto;
      background-color: #fff;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .detail-header {
      text-align: center;
      margin-bottom: 1rem;
    }
    .detail-header h2 {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .pokemon-id {
      font-size: 1rem;
      color: #888;
      margin-left: 0.5rem;
    }
    .detail-body {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
    .pokemon-image {
      flex: 1 1 300px;
      text-align: center;
    }
    .pokemon-image img {
      max-width: 250px;
      width: 100%;
      height: auto;
    }
    .pokemon-info {
      flex: 1 1 400px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .description {
      font-size: 1rem;
      line-height: 1.5;
      color: #555;
    }
    .stats-container {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .stat {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 0.8rem 1rem;
      flex: 1 1 120px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      text-align: center;
    }
    .stat strong {
      display: block;
      font-weight: 600;
      margin-bottom: 0.3rem;
    }
    .types, .abilities {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 0.8rem 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .types strong, .abilities strong {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .type-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .type-badge {
      display: inline-block;
      padding: 0.4rem 0.8rem;
      border-radius: 12px;
      color: #fff;
      font-weight: 500;
      text-transform: capitalize;
    }
    .abilities ul {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    .abilities li {
      background-color: #fff;
      border-radius: 6px;
      padding: 0.3rem 0.5rem;
      margin-bottom: 0.3rem;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .back-btn {
      display: block;
      margin: 2rem auto 0;
      background-color: #007bff;
      border: none;
      color: #fff;
      padding: 0.7rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .back-btn:hover {
      background-color: #0056b3;
    }
    .type-normal { background-color: #A8A77A; }
    .type-fire { background-color: #EE8130; }
    .type-water { background-color: #6390F0; }
    .type-electric { background-color: #F7D02C; color: #333; }
    .type-grass { background-color: #7AC74C; }
    .type-ice { background-color: #96D9D6; color: #333; }
    .type-fighting { background-color: #C22E28; }
    .type-poison { background-color: #A33EA1; }
    .type-ground { background-color: #E2BF65; color: #333; }
    .type-flying { background-color: #A98FF3; }
    .type-psychic { background-color: #F95587; }
    .type-bug { background-color: #A6B91A; }
    .type-rock { background-color: #B6A136; }
    .type-ghost { background-color: #735797; }
    .type-dragon { background-color: #6F35FC; }
    .type-dark { background-color: #705746; }
    .type-steel { background-color: #B7B7CE; color: #333; }
    .type-fairy { background-color: #D685AD; }
  `]
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonId: number | null = null;
  @Output() back = new EventEmitter<void>();
  pokemon!: Pokemon;
  description: string = 'Cargando descripción...';

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
