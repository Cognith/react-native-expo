import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Navigation<K extends keyof RootStackParamList> {
  navigation: NativeStackNavigationProp<RootStackParamList, K>;
  route: RouteProp<RootStackParamList, K>;
}
