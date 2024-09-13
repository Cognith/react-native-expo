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
  const fetchAllPokemonMock = jest.fn();

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

  test("onEndReached is triggered and conditions are met", ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("the flatlist has scrolled and query is an empty string", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      instance.fetchAllPokemon = fetchAllPokemonMock;

      jest.spyOn(instance, "setState").mockImplementation((state) => {
        instance.state = {
          ...instance.state,
          ...(typeof state === "function"
            ? state(instance.state, props)
            : state),
        };
      });

      instance.setState({
        isFlatlistScrolled: true,
        query: "",
        offset: 20,
      });
    });

    when("I trigger the onEndReached function", () => {
      instance.onEndReached();
    });

    then("it should fetch more Pokemon", () => {
      expect(fetchAllPokemonMock).toHaveBeenCalledWith(40);
    });

    then("it should update the offset state", () => {
      expect(instance.setState).toHaveBeenCalledWith({ offset: 40 });
    });
  });

  test("onScrollBeginDrag is triggered when isFlatlistScrolled is false", ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("the flatlist has not been scrolled", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      instance.fetchAllPokemon = fetchAllPokemonMock;

      jest.spyOn(instance, "setState").mockImplementation((state) => {
        instance.state = {
          ...instance.state,
          ...(typeof state === "function"
            ? state(instance.state, props)
            : state),
        };
      });

      instance.setState({ isFlatlistScrolled: false });
    });

    when("I trigger the onScrollBeginDrag function", () => {
      instance.onScrollBeginDrag();
    });

    then("it should update the isFlatlistScrolled state to true", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isFlatlistScrolled: true,
      });
    });
  });

  test("when debounceTimeout is not null", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("debounceTimeout is set", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;

      instance.debounceTimeout = setTimeout(() => {}, 500);

      jest.spyOn(global, "clearTimeout");
    });

    when("onChangeText is triggered", () => {
      instance.onChangeText("new text");
    });

    then("clearTimeout should be called", () => {
      expect(clearTimeout).toHaveBeenCalled();
    });
  });
});
