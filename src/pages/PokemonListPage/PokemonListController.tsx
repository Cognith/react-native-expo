import { Component } from "react";
import { pokemonListItem } from "../../services";
import { Navigation } from "../../types";

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
  }
}
