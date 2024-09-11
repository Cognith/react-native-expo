import { ComponentType } from "react";
import { PokemonListPage } from "../pages";

interface RouteType {
  component: ComponentType<any>;
  path: string;
}

const routeMap: Array<RouteType> = [
  {
    component: PokemonListPage,
    path: "PokemonList",
  },
];

export default routeMap;
