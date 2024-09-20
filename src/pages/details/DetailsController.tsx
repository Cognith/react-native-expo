import { useState, useEffect } from "react";

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  base_experience: number;
}

export const useDetailsController = (pokemonUrl: string) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => setPokemonDetails(data))
      .catch((error) => console.error(error));
  }, [pokemonUrl]);

  const getTypeDetails = (type: string) => {
    switch (type.toLowerCase()) {
      case "electric":
        return {
          borderColor: "black",
          backgroundColor: "#FFD700",
          emoji: "⚡",
        };
      case "water":
        return {
          borderColor: "black",
          backgroundColor: "#4682B4",
          emoji: "💧",
        };
      case "fire":
        return {
          borderColor: "black",
          backgroundColor: "#FF5733",
          emoji: "🔥",
        };
      case "grass":
        return {
          borderColor: "black",
          backgroundColor: "#66cc66",
          emoji: "🍀",
        };
      case "poison":
        return {
          borderColor: "black",
          backgroundColor: "#800080",
          emoji: "💀",
        };
      case "ground":
        return {
          borderColor: "black",
          backgroundColor: "#895129",
          emoji: "🗻",
        };
      case "psychic":
        return {
          borderColor: "black",
          backgroundColor: "violet",
          emoji: "👁",
        };
      default:
        return {
          borderColor: "black",
          backgroundColor: "#a0a0a0",
          emoji: "❓",
        };
    }
  };

  return { pokemonDetails, getTypeDetails };
};
