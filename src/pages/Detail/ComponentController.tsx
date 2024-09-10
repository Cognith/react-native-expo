import { Component } from "react";
import { Navigation, Pokemon, PokemonStat } from "../../types";
import { pokemonTransformer } from "../../helpers";

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

interface Options {
  id?: number;
  name?: string;
}

export default class ComponentController extends Component<Props, S> {
  private debounceTimeout: NodeJS.Timeout | null = null;

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
    const { params } = this.props.route;
    this.fetchPokemon({ id: params?.pokemon?.id });
  };

  componentDidUpdate(prevProps: Props, prevState: S) {
    const { query, debouncedQuery } = this.state;
    if (prevState.debouncedQuery !== debouncedQuery) {
      if (query !== "") {
        this.fetchPokemon({ name: query });
      } else {
        this.fetchPokemonFromParams();
      }
    }
  }

  fetchPokemonFromParams = () => {
    const { params } = this.props.route;
    if (params?.pokemon?.id) {
      const formattedStats = this.formattingStats(params?.pokemon?.stats);
      this.setState({ pokemon: { ...params?.pokemon, stats: formattedStats } });
    }
  };

  fetchPokemon = async (options: Options) => {
    const { isLoading } = this.state;
    const url = options?.id
      ? `https://pokeapi.co/api/v2/pokemon/${options?.id}`
      : `https://pokeapi.co/api/v2/pokemon/${options?.name?.toLowerCase()}`;

    try {
      console.log("Fetching Pokemon ...");
      if (!isLoading) this.setState({ isLoading: true });

      const pokemonResponse = await fetch(url);
      const pokemonJson = await pokemonResponse.json();
      const newPokemon = pokemonTransformer(pokemonJson);
      const formattedStats = this.formattingStats(newPokemon.stats);

      this.setState({
        isLoading: false,
        pokemon: { ...newPokemon, stats: formattedStats },
      });
    } catch (error: any) {
      console.log("[error] fetchPokemon", error);
      this.setState({ isLoading: false, pokemon: null });
    }
  };

  formattingStats = (stats: any) => {
    let newStats: PokemonStat[] = [];
    stats.map((item: any) => {
      if (item.name === "hp") {
        newStats.push({
          ...item,
          name: "HP",
        });
      } else {
        let formattedName = item.name.replace("-", " ");

        const words = formattedName.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        newStats.push({
          ...item,
          name: words.join(" "),
        });
      }
    });

    return newStats;
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
}
