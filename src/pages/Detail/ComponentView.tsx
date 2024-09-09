import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  FlatList,
} from "react-native";
import ComponentController from "./ComponentController";
import { IdBadge, SearchBar, TypeBadge } from "../../components";

export default class DetailPage extends ComponentController {
  render() {
    const { pokemon } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={StyleSheet.flatten([
            styles.paddingContainer,
            { paddingVertical: Platform.OS === "android" ? 30 : 0 },
          ])}
        >
          <SearchBar />
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <View style={styles.idBadgeContainer}>
              <IdBadge
                type={pokemon?.types[0]?.name}
                formattedId={pokemon?.formattedId}
              />
            </View>
            <Image
              style={styles.pokemonImage}
              source={{
                uri: pokemon?.image,
              }}
            />
            <Text style={styles.nameText}>{pokemon?.name}</Text>
            <View style={styles.descriptionBox}>
              <Text
                style={{
                  color: "#ECDFCC",
                  textAlign: "center",
                  fontSize: 16,
                  fontStyle: "italic",
                  fontWeight: "500",
                  marginBottom: 20,
                }}
              >
                "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
                ipsum dolor sit amet"
              </Text>
              <Text
                style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}
              >
                Pokemon Type
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                {pokemon?.types.map((type, index) => (
                  <View
                    key={`${type.name}-${index}`}
                    style={{ marginRight: 6 }}
                  >
                    <TypeBadge type={type.name} />
                  </View>
                ))}
              </View>
              <View style={styles.statsBox}>
                <FlatList
                  data={pokemon?.stats}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={styles.columnWrapperStyle}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#ECDFCC" }}>{item.name}</Text>
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        {item.baseStat}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E201E",
  },
  paddingContainer: {
    paddingHorizontal: 20,
  },
  idBadgeContainer: { alignSelf: "flex-start" },
  pokemonImage: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginBottom: 5,
  },
  descriptionBox: {
    backgroundColor: "#3C3D37",
    borderRadius: 10,
    padding: 15,
  },
  statsBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#40534C",
  },
  columnWrapperStyle: {
    marginBottom: 10,
  },
});
