import { Component } from "react";
import { Navigation, Pokemon, PokemonStat, PokemonType } from "../../types";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {
  isLoading: boolean;
  pokemon: Pokemon[];
  isFlatlistScrolled: boolean;
  offset: number;
}

export default class ComponentController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      pokemon: [],
      isFlatlistScrolled: false,
      offset: 0,
    };
  }

  componentDidMount = async () => {
    console.log("Component Mount");
    this.fetchPokemon();
  };

  fetchPokemon = async (offset?: number | 0) => {
    const { isLoading } = this.state;
    let pokemonArray: Pokemon[] = [];
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

    try {
      if (!isLoading) this.setState({ isLoading: true });

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
            this.setState({ isLoading: false });
            return null;
          }
        });

        const resolvedPokemonArray = await Promise.all(pokemonPromises);
        pokemonArray = resolvedPokemonArray.filter(
          (pokemon) => pokemon !== null
        );

        this.setState({
          isLoading: false,
          pokemon: [...this.state.pokemon, ...pokemonArray],
        });
      }
    } catch (error: any) {
      this.setState({ isLoading: false });
      console.error(error.message);
    }
  };

  onScrollBeginDrag = () => {
    const { isFlatlistScrolled } = this.state;
    if (!isFlatlistScrolled) {
      this.setState({ isFlatlistScrolled: true });
    }
  };

  onEndReached = () => {
    const { offset, isFlatlistScrolled } = this.state;
    if (isFlatlistScrolled) {
      this.fetchPokemon(offset + 20);
      this.setState({ offset: this.state.offset + 20 });
    }
  };

  navigateToDetail = (pokemon: Pokemon) => {
    const { navigation } = this.props;
    navigation.navigate("Detail", { pokemon });
  };
}
