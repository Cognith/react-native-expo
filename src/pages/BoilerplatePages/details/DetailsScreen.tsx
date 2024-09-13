import React from "react";
import DetailsComponent from '../../../components/DetailsComponent'
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type RootStackParam = {
  Home: undefined;
  Detail: { pokemonUrl: string };
};


type DetailsScreenProps = NativeStackScreenProps<RootStackParam, "Detail">;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  return <DetailsComponent route={route} />;
};

export default DetailsScreen;
