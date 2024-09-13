import { ComponentType } from "react";
import { PokemonListPage } from "../pages";
import PokemonDetailPage from "../pages/PokemonDetailPage/PokemonDetailPage";

interface RouteType {
  component: ComponentType<any>;
  path: string;
}

export type MainStackParams =  {
  Home: undefined,
  PokemonDetail: {
    id: number
  }
}

const routeMap: Array<RouteType> = [
  {
    component: PokemonListPage,
    path: "Home",
  },
    {
    component: PokemonDetailPage,
    path: "PokemonDetail",
  },
];

export default routeMap;
