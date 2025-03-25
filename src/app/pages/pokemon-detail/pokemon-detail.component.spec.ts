import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';
import { Pokemon, PokemonSpecies } from '../../models/pokemon.model';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PokemonService', ['getPokemon', 'getPokemonSpecies']);

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        { provide: PokemonService, useValue: spy }
      ]
    }).compileComponents();

    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load a pokemon and set description properly', () => {
    const mockPokemon: Pokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 100,
      sprites: {
        front_default: 'url-frontal',
        other: { 'official-artwork': { front_default: 'url-oficial' } }
      },
      abilities: [],
      types: []
    } as any;

    const mockSpecies: PokemonSpecies = {
      flavor_text_entries: [
        {
          flavor_text: 'Descripción de Pikachu',
          language: { name: 'es' }
        }
      ]
    } as any;

    pokemonServiceSpy.getPokemon.and.returnValue(of(mockPokemon));
    pokemonServiceSpy.getPokemonSpecies.and.returnValue(of(mockSpecies));

    component.pokemonId = 25;
    component.ngOnInit();
    fixture.detectChanges();

    expect(pokemonServiceSpy.getPokemon).toHaveBeenCalledWith(25);
    expect(pokemonServiceSpy.getPokemonSpecies).toHaveBeenCalledWith(25);

    expect(component.description).toBe('Descripción de Pikachu');
    expect(component.pokemon.name).toBe('pikachu');
  });

  it('should emit the back event when goBack is called', () => {
    spyOn(component.back, 'emit');

    component.goBack();
    expect(component.back.emit).toHaveBeenCalled();
  });
});
