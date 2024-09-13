import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useDetailsController } from "../pages/BoilerplatePages/details/DetailsController";
import { styles } from "../constanst/DetailsStyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackParam } from "../pages/BoilerplatePages/details/DetailsScreen";

type DetailsComponentProps = {
  route: RouteProp<RootStackParam, "Detail">;
};

interface DetailsScreenProps {
  route: {
    params: {
      pokemonUrl: string;
    };
  };
}

const DetailsComponent: React.FC<DetailsScreenProps> = ({ route }) => {
  const { pokemonUrl } = route.params;
  const { pokemonDetails, getTypeDetails } = useDetailsController(pokemonUrl);

  if (!pokemonDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const abilities = pokemonDetails.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  const stats = pokemonDetails.stats.map((stat) => (
    <Text key={stat.stat.name} style={styles.detail}>
      {stat.stat.name}: {stat.base_stat}
    </Text>
  ));

  const firstType = pokemonDetails.types[0]?.type.name;
  const { borderColor, emoji, backgroundColor } = getTypeDetails(firstType);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>
      <Image
        source={{ uri: pokemonDetails.sprites.front_default }}
        style={styles.pokemonImage}
      />
      <View style={styles.typeContainer}>
        <View style={[styles.badge, { borderColor }]}>
          <Text style={styles.typeEmoji}>{emoji}</Text>
          <Text style={styles.detail}>{firstType}</Text>
        </View>
      </View>

      <View style={styles.abilitiesContainer}>
        <Text style={styles.detail}>Abilities: {abilities}</Text>
      </View>

      <View style={styles.statsRowContainer}>
        <View style={styles.statsColumn}>
          <Text style={styles.statsHeader}>Stats:</Text>
          {stats}
        </View>
        <View style={styles.secondStatsColumn}>
          <Text style={styles.detail}>Height: {pokemonDetails.height}</Text>
          <Text style={styles.detail}>Weight: {pokemonDetails.weight}</Text>
          <Text style={styles.detail}>
            Base Experience: {pokemonDetails.base_experience}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsComponent;
