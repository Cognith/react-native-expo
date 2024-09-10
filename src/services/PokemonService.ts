import { PokemonModel, PokemonsResponseModel } from "./models";
import { PokeApiPokemonMapper } from "./mappers/PokeApiPokemonMapper";
import { PokemonData } from "../types";

const pokemonDetailsMapper = new PokeApiPokemonMapper();

class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2';

  static async getPokemonsList(limit = 20, offset = 0): Promise<PokemonsResponseModel> {
    const response = await fetch(
      `${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );
    const data = await response.json();

    return data;
  }

  static async getPokemonDetails(url: string): Promise<PokemonData> {
    const response = await fetch(url);
    const data = await response.json();

    return pokemonDetailsMapper.map(data);
  }
};

export default PokemonService;
