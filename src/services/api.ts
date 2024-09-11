import axios from "axios";

export interface getPokemonListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonListItem[];
}

export interface pokemonListItem {
  name: string;
  url: string;
}

export const getPokemonList = async ({
  limit = 10,
  offset = 0,
}): Promise<getPokemonListData> => {
  try {
    console.log(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return res.data;
  } catch (error) {
    console.log("getPokemonList error: ", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};
