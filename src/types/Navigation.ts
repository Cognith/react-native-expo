import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";

export interface Navigation<R extends ParamListBase = ParamListBase> {
  navigation: NavigationProp<R>;
  route: RouteProp<R, keyof R>;
}
