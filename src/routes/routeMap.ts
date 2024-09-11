import { ComponentType } from "react";
import { PokemonDetailPage, PokemonListPage } from "../pages";

interface RouteType {
  component: ComponentType<any>;
  path: string;
}

const routeMap: Array<RouteType> = [
  {
    component: PokemonListPage,
    path: "PokemonList",
  },
  {
    component: PokemonDetailPage,
    path: "PokemonDetail",
  },
];

export default routeMap;
