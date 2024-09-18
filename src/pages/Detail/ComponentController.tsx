import { Component } from "react";
import { Navigation, Pokemon } from "../../types";
import { pokemonTransformer } from "../../helpers";
import { getPokemon } from "../../services";

interface Props {
  navigation: Navigation["navigation"];
  route: Navigation["route"];
}

interface S {
  isLoading: boolean;
  pokemon: Pokemon | null;
  query: string;
  debouncedQuery: string;
}

export default class ComponentController extends Component<Props, S> {
  public debounceTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      pokemon: null,
      query: "",
      debouncedQuery: "",
    };
  }

  componentDidMount = async () => {
    this.fetchPokemon();
  };

  fetchPokemon = async () => {
    const { params } = this.props.route;
    try {
      this.setState({ isLoading: true });
      const pokemonJson = await getPokemon(params.pokemon.name);
      const newPokemon = pokemonTransformer(pokemonJson);

      this.setState({
        isLoading: false,
        pokemon: newPokemon,
      });
    } catch (error: any) {
      console.log("[error] fetchPokemon", error);
      this.setState({ isLoading: false, pokemon: null });
    }
  };
}
