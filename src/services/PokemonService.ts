import axios from "axios";
import { PokemonModel, PokemonsDataModel } from "../models/PokemonModels";

class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2';

  static async getPokemonList(limit = 20, offset = 0): Promise<PokemonsDataModel> {
    const response = await axios.get<PokemonsDataModel>(
      `${this.BASE_URL}/pokemon`,
      { params: { limit, offset } },
    );
    return response.data;
  }

  static async getPokemonDetails(url: string): Promise<PokemonModel> {
    const response = await axios.get<PokemonModel>(url);
    return response.data;
  }
}

export default PokemonService;
