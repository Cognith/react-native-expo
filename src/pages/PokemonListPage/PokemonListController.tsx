import { Component } from "react";
import { View } from "react-native";
import { pokemonListItem } from "../../services";
import { Navigation } from "../../types";

import debounce from "lodash/debounce";
import { getPokemonList } from "../../services";
import { ListItem } from "./components";
import { styles } from "./styles";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {
  search: string;
  data: pokemonListItem[];
  limit: number;
  offset: number;
}

export default class PokemonListController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: "",
      data: [],
      limit: 10,
      offset: 0,
    };

    this.handleSetSearch = debounce(this.handleSetSearch.bind(this), 300);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const response = await getPokemonList({
      limit: this.state.limit,
      offset: this.state.offset,
    });

    this.setState((prev) => ({
      ...prev,
      data: [...prev.data, ...response.results],
      offset: prev.offset + response.results.length,
    }));
  }

  handleSetSearch(value: string) {
    this.setState({ search: value });
  }

  keyExtractor(item: pokemonListItem, index: number) {
    return `${item.name}__${item.url}__${index}`;
  }

  renderItem({ item, index }: { item: pokemonListItem; index: number }) {
    return (
      <ListItem item={item} index={index} navigation={this.props.navigation} />
    );
  }
}
