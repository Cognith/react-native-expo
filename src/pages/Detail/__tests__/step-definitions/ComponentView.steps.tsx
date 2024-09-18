import { RouteProp } from "@react-navigation/native";
import DetailPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Pokemon } from "../../../../types";
import {
  pokemonDetailMock,
  pokemonDetailResponseMock,
} from "../../../../__mocks__";
import * as services from "../../../../services";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
  route: {
    params: {
      pokemon: pokemonDetailMock,
    },
  } as RouteProp<{ params: { pokemon: Pokemon } }, "params">,
};

const feature = loadFeature(
  "./src/pages/Detail/__tests__/features/ComponentView.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonDetailResponseMock),
      })
    ) as jest.Mock;
  });

  afterEach(() => {});

  test("Render Pokemon Detail", ({ given, when, then }) => {
    let DetailPageWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("I am on the Detail Page", () => {
      DetailPageWrapper = shallow(<DetailPage {...props} />);
    });

    when("I successfully load Detail Page", async () => {
      instance = DetailPageWrapper.instance() as DetailPage;
    });

    then("I should see Bulbasaur", () => {
      const pokemonNameText = DetailPageWrapper.find(
        '[testID="pokemon-name-text"]'
      );
      expect(pokemonNameText).toBeDefined();
    });
  });

  test("Handle error when fetching Pokemon", ({ given, when, then }) => {
    let DetailPageWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("I am on the Detail Page", () => {
      DetailPageWrapper = shallow(<DetailPage {...props} />);
      instance = DetailPageWrapper.instance() as DetailPage;
      jest
        .spyOn(services, "getPokemon")
        .mockRejectedValue(new Error("Network Error"));
    });

    when("I call the API and get error", async () => {
      await instance.fetchPokemon();
    });

    then(
      "It should set isLoading to false and pokemon to null in the state",
      () => {
        expect(instance.state).toEqual({
          isLoading: false,
          pokemon: null,
          query: "",
          debouncedQuery: "",
        });
      }
    );
  });
});
