import { Component } from "react";
import { Navigation, Pokemon } from "../../types";
import { pokemonTransformer } from "../../helpers";
import { getPokemon, getPokemonList } from "../../services";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {
  isLoading: boolean;
  pokemon: Pokemon[];
  isFlatlistScrolled: boolean;
  offset: number | 0;
  query: string;
  debouncedQuery: string;
}

export default class ComponentController extends Component<Props, S> {
  public debounceTimeout: NodeJS.Timeout | null = null;

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

    if (!isLoading) {
      try {
        if (!isLoading) this.setState({ isLoading: true });
        const pokemonListJson = await getPokemonList(offset);
        if (pokemonListJson.results.length > 0) {
          const pokemonPromises = pokemonListJson.results.map(
            async (item: any) => {
              try {
                const pokemonJson = await getPokemon(item.name);
                const newPokemon = pokemonTransformer(pokemonJson);
                return newPokemon;
              } catch (error) {
                console.log(
                  "[error] Fetching Pokemon inside fetchAllPokemon",
                  error
                );
                this.setState({ isLoading: false });
                return null;
              }
            }
          );

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
        console.log("[d] asd");
        console.log("[error] fetchAllPokemon", error);
        this.setState({ isLoading: false });
      }
    }
  };

  fetchPokemon = async (query: string) => {
    try {
      const { isLoading } = this.state;
      if (!isLoading) this.setState({ isLoading: true });

      const pokemonJson = await getPokemon(query);
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
