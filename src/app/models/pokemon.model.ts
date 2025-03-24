export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonSpriteOther {
  'official-artwork'?: {
    front_default: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other?: PokemonSpriteOther;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}
