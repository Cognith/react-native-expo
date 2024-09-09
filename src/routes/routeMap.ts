import { ComponentType } from "react";
import { ComponentDetail, ComponentHome } from "../pages";

interface RouteType {
  component: ComponentType<any>;
  path: string;
}

const routeMap: Array<RouteType> = [
  {
    component: ComponentDetail,
    path: "Detail",
  },
  {
    component: ComponentHome,
    path: "Home",
  },
];

export default routeMap;
