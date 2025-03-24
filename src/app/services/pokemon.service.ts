import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse, PokemonSpecies } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number = 0, limit: number = 1281): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemon(id: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonSpecies(id: string | number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.apiUrl}/pokemon-species/${id}`);
  }
}
