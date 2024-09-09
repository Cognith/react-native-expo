import { ComponentType } from "react";
import { PokemonDetailsView, PokemonsListView } from "../pages";
import { PokemonData } from "../types";

interface RouteType {
  component: ComponentType<any>;
  path: string;
  params?: any;
}

const routeMap: Array<RouteType> = [
  {
    component: PokemonsListView,
    path: 'Home',
  },
  {
    component: PokemonDetailsView,
    path: 'Details',
    params: { data: {} as PokemonData }
  },
];

export default routeMap;
