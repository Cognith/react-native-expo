import { ComponentType } from "react";
import { ComponentHome } from "../pages";

interface RouteType {
  component: ComponentType<any>;
  path: string;
}

const routeMap: Array<RouteType> = [
  {
    component: ComponentHome,
    path: "Home",
  },
];

export default routeMap;
