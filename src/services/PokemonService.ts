import axios from "axios";
import { PokemonModel, PokemonsResponseModel } from "./models";
import { PokeApiPokemonMapper } from "./mappers/PokeApiPokemonMapper";
import { PokemonData } from "../types";

const pokemonDetailsMapper = new PokeApiPokemonMapper();

class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2';

  static async getPokemonsList(limit = 20, offset = 0): Promise<PokemonsResponseModel> {
    const response = await axios.get<PokemonsResponseModel>(
      `${this.BASE_URL}/pokemon`,
      { params: { limit, offset } },
    );
    return response.data;
  }

  static async getPokemonDetails(url: string): Promise<PokemonData> {
    const response = await axios.get<PokemonModel>(url);
    return pokemonDetailsMapper.map(response.data);
  }
};

export default PokemonService;
