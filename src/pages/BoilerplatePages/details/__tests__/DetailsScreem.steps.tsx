import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import DetailsScreen from "../DetailsScreen";
import DetailsComponent from "../../../../components/DetailsComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParam } from "../DetailsScreen";

const feature = loadFeature(
  "./src/pages/BoilerplatePages/details/__tests__/features/DetailsScreen.feature"
);

type DetailsScreenProps = NativeStackScreenProps<RootStackParam, "Detail">;

defineFeature(feature, (test) => {
  let DetailsScreenWrapper: ShallowWrapper;
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/1/";

  test("Render Details Component", ({ given, when, then }) => {
    given("I am on the Details Screen", () => {
      const props: DetailsScreenProps = {
        route: { params: { pokemonUrl } } as any,
        navigation: {} as any,
      };

      DetailsScreenWrapper = shallow(<DetailsScreen {...props} />);
    });

    when("I provide a valid pokemonUrl", () => {});

    then("I should see the details for the Pokémon", () => {
      const detailsComponent = DetailsScreenWrapper.find(DetailsComponent);
      expect(detailsComponent.exists()).toBe(true);

      expect(detailsComponent.prop("route")).toEqual({
        params: { pokemonUrl },
      });
    });
  });
});
