import { PureComponent } from "react";
import { pokemonListItem } from "../../../../services";
import { Navigation } from "../../../../types";

interface Props {
  item: pokemonListItem;
  index: number;
  navigation: Navigation["navigation"];
}

interface S {}

export default class ListItemController extends PureComponent<Props, S> {
  isEven: boolean;

  constructor(props: Props) {
    super(props);

    this.isEven = props.index % 2 === 0;
  }

  onPress() {
    this.props.navigation.navigate("PokemonDetail");
  }
}
