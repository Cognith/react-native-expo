import { ComponentType } from "react";
import { PokemonDetailsView, PokemonsListView } from "../pages";
import { RootStackParamList } from "../types";

interface RouteType {
  component: ComponentType<any>;
  path: keyof RootStackParamList;
}

const routeMap: Array<RouteType> = [
  {
    component: PokemonsListView,
    path: 'Home',
  },
  {
    component: PokemonDetailsView,
    path: 'Details',
  },
];

export default routeMap;
