import { Component } from "react";
import { Navigation, Pokemon, PokemonStat, PokemonType } from "../../types";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {
  pokemon: Pokemon[];
}

export default class ComponentController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemon: [],
    };
  }

  componentDidMount = async () => {
    console.log("Component Mount");
    this.fetchPokemon();
  };

  fetchPokemon = async () => {
    let pokemonArray: Pokemon[] = [];
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.results.length > 0) {
        const pokemonPromises = json.results.map(async (item: any) => {
          try {
            const pokemonResponse = await fetch(item.url);
            const pokemon = await pokemonResponse.json();

            let pokemonTypes: PokemonType[] = [];
            pokemon.types.map((item: any) => {
              pokemonTypes.push({ name: item.type.name });
            });

            let pokemonStats: PokemonStat[] = [];
            pokemon.stats.map((item: any) => {
              pokemonStats.push({
                name: item.stat.name,
                baseStat: item.base_stat,
              });
            });

            const newPokemon: Pokemon = {
              id: pokemon.id,
              formattedId: pokemon.id.toString().padStart(4, "0"),
              name: pokemon.name,
              url: pokemon.species.url,
              image: pokemon.sprites.front_shiny,
              types: pokemonTypes,
              stats: pokemonStats,
            };

            return newPokemon;
          } catch (error) {
            console.error("Failed to fetch pokemon data:", error);
            return null;
          }
        });

        const resolvedPokemonArray = await Promise.all(pokemonPromises);
        pokemonArray = resolvedPokemonArray.filter(
          (pokemon) => pokemon !== null
        );

        this.setState({
          pokemon: pokemonArray,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  navigateToDetail = (pokemon: Pokemon) => {
    const { navigation } = this.props;
    navigation.navigate("Detail", { pokemon });
  };
}
