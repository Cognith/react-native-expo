import { RouteProp } from "@react-navigation/native";
import DetailPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Pokemon } from "../../../../types";
import {
  pokemonDetailMock,
  pokemonDetailResponseMock,
} from "../../../../__mocks__";

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
  let DetailPageWrapper: ShallowWrapper;
  let instance: DetailPage;

  jest.useFakeTimers(); // for debounce
  const mockSetState = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonDetailResponseMock),
      })
    ) as jest.Mock;
  });

  test("Render Pokemon Detail", ({ given, when, then }) => {
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

  test("User types into the input field", ({ given, when, then }) => {
    given("I am on the HomePage", () => {
      jest.spyOn(instance, "setState").mockImplementation(mockSetState);
    });

    when("I type a query in the input field", () => {
      const text = "pikachu";
      instance.onChangeText(text);
    });

    then("It should update the query state", () => {
      expect(mockSetState).toHaveBeenCalledWith({ query: "pikachu" });
    });

    then("It should debounce the query after 500ms", () => {
      jest.advanceTimersByTime(500);
      expect(mockSetState).toHaveBeenCalledWith({ debouncedQuery: "pikachu" });
    });
  });
});
