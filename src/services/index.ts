const getPokemon = async (query: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
  console.log("[getPokemon]", url);
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error: any) {
    console.log("[error] getPokemon", error);
  }
};

const getPokemonList = async (offset?: number | 0) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
  console.log("[getPokemonList]", url);
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error: any) {
    console.log("[error] getPokemonList", error);
  }
};

export { getPokemon, getPokemonList };
