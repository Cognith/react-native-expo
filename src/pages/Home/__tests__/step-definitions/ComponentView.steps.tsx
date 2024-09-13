import HomePage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import {
  pokemonDetailMock,
  pokemonDetailResponseMock,
  pokemonListResponseMock,
} from "../../../../__mocks__";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/ComponentView.feature"
);

defineFeature(feature, (test) => {
  jest.useFakeTimers(); // for debounce
  const mockSetState = jest.fn();
  const pokemonListFetchMock = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn((url) => {
      if (url.startsWith("https://pokeapi.co/api/v2/pokemon?offset=")) {
        return Promise.resolve({
          json: () => Promise.resolve(pokemonListResponseMock),
        });
      }
      if (url.startsWith("https://pokeapi.co/api/v2/pokemon/")) {
        return Promise.resolve({
          json: () => Promise.resolve(pokemonDetailResponseMock),
        });
      }
    }) as jest.Mock;
  });

  afterEach(() => {
    mockSetState.mockRestore();
    pokemonListFetchMock.mockRestore();
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("I am on the Home Page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
    });

    when("I successfully load Home Page", async () => {
      instance = HomePageWrapper.instance() as HomePage;
    });

    then("I should see Hello World", () => {
      const helloWorldText = HomePageWrapper.find(
        '[data-test-id="hello-text"]'
      );

      expect(helloWorldText).toBeDefined();
    });
  });

  test("User types into the input field", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("I am on the HomePage", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
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

  test("Navigating to the detail screen", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("I am on the home page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
    });

    when("I navigate to the detail screen for a Pokemon", () => {
      instance.navigateToDetail(pokemonDetailMock);
    });

    then("the navigation should occur with the correct Pokemon data", () => {
      expect(props.navigation.navigate).toHaveBeenCalledWith("Detail", {
        pokemon: pokemonDetailMock,
      });
    });
  });
});
