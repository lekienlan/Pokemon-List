export interface PokemonList {
  count: number;
  next?: any;
  previous?: any;
  results: PokemonType[];
}

export interface PokemonType extends Pokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  sprites: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}
