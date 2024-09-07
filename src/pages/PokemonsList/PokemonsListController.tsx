import { Component } from 'react';
import { PokemonModel } from '../../models/PokemonModels';
import { Navigation } from '../../types';

// Props
interface Props {
  navigation: Navigation["navigation"];
}

// State
interface State {
  pokemons: PokemonModel[];
  isLoading: boolean;
  error: null | string;
}

export default class PokemonsListController extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount = async () => {
    console.log('PokemonsList Mount');
  };
}
