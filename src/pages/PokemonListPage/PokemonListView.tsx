import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import debounce from "lodash/debounce";
import { getPokemonList, pokemonListItem } from "../../services";
import PokemonListController from "./PokemonListController";
import { styles } from "./styles";

export default class PokemonListPage extends PokemonListController {
  constructor(props: any) {
    super(props);

    // Initial state setup
    this.state = {
      search: "",
      data: [],
      limit: 10,
      offset: 0,
    };

    // Debounced search handler
    this.handleSetSearch = debounce(this.handleSetSearch.bind(this), 300);
  }

  componentDidMount() {
    getPokemonList({ limit: this.state.limit, offset: this.state.offset }).then(
      (response) => {
        this.setState((prev) => ({
          ...prev,
          data: [...prev.data, ...response.results],
        }));
        this.setState({});
      }
    );
  }

  handleSetSearch(value: string) {
    this.setState({ search: value });
    // You could also add logic here to filter the `data` or make an API call
  }

  renderItem({ item, index }: { item: pokemonListItem; index: number }) {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        style={[styles.itemWrapper, isEven && styles.itemSpacing]}
      >
        <Text style={styles.itemName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  }
  renderSeparator(item: pokemonListItem) {
    return <View style={styles.separator} />;
  }

  render() {
    const { data, search } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TextInput onChangeText={this.handleSetSearch} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={this.renderItem}
          numColumns={2}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    );
  }
}
