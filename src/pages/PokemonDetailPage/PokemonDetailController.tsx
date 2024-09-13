import { RouteProp } from '@react-navigation/native';
import { PureComponent } from 'react';
import { Alert, Linking } from 'react-native';
import IPokemon from '../../interfaces/IPokemon';
import { MainStackParams } from '../../routes/routeMap';
import PokemonServices from '../../services/PokemonServices';
import { Navigation } from '../../types';

export interface PokemonDetailControllerProps {
  route: RouteProp<MainStackParams, 'PokemonDetail'>;
  navigation: Navigation['navigation'];
}
export interface PokemonDetailControllerState {
  detail?: IPokemon & {
    profile: { label: string; value: string | number; url?: string }[];
  };
}

export class PokemonDetailController extends PureComponent<
  PokemonDetailControllerProps,
  PokemonDetailControllerState
> {
  constructor(props: PokemonDetailControllerProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    this.fetchPokemonDetail();
  }

  fetchPokemonDetail = async () => {
    const id = this.props.route.params.id;
    const pokemonDetail = await PokemonServices.getPokemonDetail(id);

    this.setState({
      detail: {
        ...pokemonDetail,
        name:
          pokemonDetail.name.charAt(0).toUpperCase() +
          pokemonDetail.name.slice(1),
        profile: [
          {
            label: 'Weight',
            value: pokemonDetail.weight,
          },
          {
            label: 'Category',
            value: pokemonDetail.category || '-',
          },
          {
            label: 'Height',
            value: pokemonDetail.height,
          },
          {
            label: 'Generation',
            value: (pokemonDetail.generationName || '-').toUpperCase(),
            url: pokemonDetail.generationUrl,
          },
        ],
      },
    });
  };

  goToLink = (url: string) => async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
}

export default PokemonDetailController;
