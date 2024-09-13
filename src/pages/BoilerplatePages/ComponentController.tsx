import React from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
}

interface HomeControllerState {
  pokemonList: Pokemon[];
  filteredPokemonList: Pokemon[];
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  searchQuery: string;
}

const limit = 20;

export default abstract class HomeController<T> extends React.Component<
  T,
  HomeControllerState
> {
  constructor(props: T) {
    super(props);
    this.state = {
      pokemonList: [],
      filteredPokemonList: [],
      loading: true,
      loadingMore: false,
      offset: 0,
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchPokemonData(this.state.offset);
  }

  fetchPokemonData = async (offset: number) => {
    this.setState({ loadingMore: true });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();

      const fetchPromises = data.results.map(async (pokemon: any) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: pokemon.name,
          imageUrl: details.sprites.front_default,
          url: pokemon.url,
        };
      });

      const pokemonData = await Promise.all(fetchPromises);
      const updatedList = [...this.state.pokemonList, ...pokemonData];

      this.setState({
        pokemonList: updatedList,
        filteredPokemonList: updatedList,
        loading: false,
        loadingMore: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loadingMore: false });
    }
  };

  handleLoadMore = () => {
    if (this.state.loadingMore) return;
    this.setState({ loadingMore: true, offset: this.state.offset + 20 }, () => {
      this.fetchPokemonData(this.state.offset);
    });
  }
  

  handleSearch = (text: string) => {
    this.setState({ searchQuery: text });

    const filteredData = this.state.pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase()) ||
        pokemon.id.toString().includes(text)
    );

    this.setState({ filteredPokemonList: filteredData });
  };

  abstract render(): JSX.Element;
}
