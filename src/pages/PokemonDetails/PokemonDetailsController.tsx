import { Component } from 'react';
import { Navigation } from '../../types';

// Props
interface Props extends Navigation<'Details'> {}

export default class PokemonDetailsController extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getPokemonData = () => this.props.route.params.pokemon;
}
