import Ionicons from '@expo/vector-icons/Ionicons';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors, ColorsName } from '../../assets/colors/colors';
import BackNavigationBtn from '../../components/BackNavigationBtn/BackNavigationBtn';
import IPokemon from '../../interfaces/IPokemon';
import PokemonDetailController from './PokemonDetailController';

export class PokemonDetailPage extends PokemonDetailController {
  renderPokemonStat = ({ item }: { item: IPokemon['stats'][0] }) => {
    return (
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>{item.label}</Text>
        <Text style={styles.statValue}>{item.value}</Text>
      </View>
    );
  };

  renderPokemonProfile = ({
    item,
  }: {
    item: { label: string; value: string | number; url?: string };
  }) => {
    return (
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>{item.label}</Text>
        <Text style={styles.statValue}>
          {item.value}{' '}
          {item.url && (
            <Ionicons
              name='link'
              color={Colors[ColorsName.TEXT_DEFAULT]}
              onPress={this.goToLink(item.url)}
            />
          )}
        </Text>
      </View>
    );
  };

  renderPokemonAbilities = function ({ item }: { item: string }) {
    return (
      <View style={styles.abilityContainer}>
        <Text style={styles.statTitle}>{item}</Text>
      </View>
    );
  };

  render() {
    const { detail } = this.state;
    const {
      pokemonId,
      name,
      image,
      flavorText,
      types,
      stats,
      profile,
      abilities,
    } = detail || {};

    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <SafeAreaView style={styles.containerView}>
            <BackNavigationBtn navigation={this.props.navigation} />

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode={'contain'}
              />
              <View style={styles.pokemonIdContainer}>
                <Text style={styles.pokemonIdTitle}>{pokemonId}</Text>
              </View>
            </View>

            <Text style={styles.pokemonName} testID={'pokemon_name'}>
              {name}
            </Text>

            <View style={styles.detailContainer}>
              <Text style={styles.flavorTitle}>"{flavorText}"</Text>

              <View style={styles.pokemonTypesWrapper}>
                <Text style={styles.pokemonDetailHeader}>{'Pokemon Type'}</Text>

                <View style={styles.pokemonTypesContainer}>
                  {types?.map((type) => (
                    <View style={styles.typeContainer} key={type}>
                      <Text style={styles.typeTitle}>{type.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <FlatList
                scrollEnabled={false}
                data={stats}
                renderItem={this.renderPokemonStat}
                numColumns={2}
                initialNumToRender={types?.length}
                contentContainerStyle={styles.pokemonStatsContainer}
                keyExtractor={(i) => `${i.label}`}
              />

              <FlatList
                scrollEnabled={false}
                data={profile}
                renderItem={this.renderPokemonProfile}
                numColumns={2}
                initialNumToRender={profile?.length}
                contentContainerStyle={styles.pokemonStatsContainer}
                keyExtractor={(i) => `${i.label}`}
              />

              <Text style={styles.pokemonDetailHeader}>{'Abilities'}</Text>
              <FlatList
                scrollEnabled={false}
                data={abilities}
                renderItem={this.renderPokemonAbilities}
                initialNumToRender={abilities?.length}
                keyExtractor={(i) => `${i}`}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default PokemonDetailPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors[ColorsName.BG_PAGE],
  },
  containerView: {
    paddingHorizontal: 16,
  },
  pokemonName: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  image: {
    width: 250,
    height: 100,
    marginBottom: 50,
  },
  detailContainer: {
    width: '100%',
    backgroundColor: Colors[ColorsName.BG_CONTAINER] + 'BA',
    flex: 1,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors[ColorsName.BORDER_DEFAULT],
    padding: 16,
  },
  flavorTitle: {
    color: Colors[ColorsName.TEXT_SECONDARY],
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  pokemonTypesWrapper: {
    flex: 1,
  },
  pokemonDetailHeader: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: '700',
  },
  pokemonTypesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeContainer: {
    backgroundColor: Colors[ColorsName.GRASS],
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeTitle: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontSize: 12,
    textAlign: 'left',
  },
  pokemonStatsContainer: {
    paddingTop: 20,
    paddingHorizontal: 18,
    backgroundColor: Colors[ColorsName.BG_CONTAINER],
    borderRadius: 8,
    marginBottom: 10,
  },
  statContainer: {
    flex: 0.5,
    marginBottom: 20,
  },
  statTitle: {
    color: Colors[ColorsName.TEXT_SECONDARY],
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  statValue: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontSize: 12,
    fontWeight: '700',
  },
  abilityContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 3,
    borderColor: Colors[ColorsName.BORDER_DEFAULT],
    borderRadius: 5,
    marginBottom: 5,
  },
  pokemonIdContainer: {
    backgroundColor: Colors[ColorsName.BG_CONTAINER],
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  pokemonIdTitle: {
    color: Colors[ColorsName.TEXT_DEFAULT],
    fontSize: 12,
    fontWeight: '700',
  },
});
