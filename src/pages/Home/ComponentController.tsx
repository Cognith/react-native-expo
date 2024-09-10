import { Component } from "react";
import { Navigation, Pokemon } from "../../types";
import { pokemonTransformer } from "../../helpers";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {
  isLoading: boolean;
  pokemon: Pokemon[];
  isFlatlistScrolled: boolean;
  offset: number;
  query: string;
  debouncedQuery: string;
}

export default class ComponentController extends Component<Props, S> {
  private debounceTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      pokemon: [],
      isFlatlistScrolled: false,
      offset: 0,
      query: "",
      debouncedQuery: "",
    };
  }

  componentDidMount = async () => {
    console.log("Component Mount");
    this.fetchAllPokemon();
  };

  componentDidUpdate(prevProps: Props, prevState: S) {
    const { query, debouncedQuery } = this.state;
    if (prevState.debouncedQuery !== debouncedQuery) {
      if (query !== "") {
        this.fetchPokemon(query);
      } else {
        this.setState({ pokemon: [] });
        this.fetchAllPokemon();
      }
    }
  }

  fetchAllPokemon = async (offset?: number | 0) => {
    const { isLoading } = this.state;
    let pokemonArray: Pokemon[] = [];
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

    if (!isLoading) {
      console.log("Fetching All Pokemon ...");
      try {
        if (!isLoading) this.setState({ isLoading: true });

        const response = await fetch(url);
        const json = await response.json();

        if (json.results.length > 0) {
          const pokemonPromises = json.results.map(async (item: any) => {
            try {
              const pokemonResponse = await fetch(item.url);
              const pokemon = await pokemonResponse.json();
              const newPokemon = pokemonTransformer(pokemon);
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
        console.log("[error] fetchAllPokemon", error);
        this.setState({ isLoading: false });
      }
    }
  };

  fetchPokemon = async (query: string) => {
    const { isLoading } = this.state;
    const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

    try {
      console.log("Fetching Pokemon:", query);
      if (!isLoading) this.setState({ isLoading: true });

      const pokemonResponse = await fetch(url);
      const pokemonJson = await pokemonResponse.json();
      const newPokemon = pokemonTransformer(pokemonJson);

      this.setState({
        isLoading: false,
        offset: 0,
        pokemon: [newPokemon],
      });
    } catch (error: any) {
      console.log("[error] fetchPokemon", error);
      this.setState({ isLoading: false, pokemon: [], offset: 0 });
    }
  };

  onChangeText = (text: string) => {
    this.setState({ query: text });

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.setState({ debouncedQuery: text });
    }, 500);
  };

  onScrollBeginDrag = () => {
    const { isFlatlistScrolled } = this.state;
    if (!isFlatlistScrolled) {
      this.setState({ isFlatlistScrolled: true });
    }
  };

  onEndReached = () => {
    const { offset, query, isFlatlistScrolled } = this.state;
    if (isFlatlistScrolled && query === "") {
      this.fetchAllPokemon(offset + 20);
      this.setState({ offset: offset + 20 });
    }
  };

  navigateToDetail = (pokemon: Pokemon) => {
    const { navigation } = this.props;
    navigation.navigate("Detail", { pokemon });
  };
}
