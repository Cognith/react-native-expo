import { ComponentType } from "react";
import { PokemonDetailsView, PokemonsListView } from "../pages";

interface RouteType {
  component: ComponentType<any>;
  path: string;
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
