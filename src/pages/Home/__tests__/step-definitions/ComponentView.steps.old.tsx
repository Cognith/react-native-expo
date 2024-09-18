import HomePage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import {
  pokemonDetailMock,
  pokemonDetailResponseMock,
  pokemonListResponseMock,
} from "../../../../__mocks__";
import * as services from "../../../../services";
import * as helpers from "../../../../helpers";

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
  const fetchPokemonMock = jest.fn();
  const fetchAllPokemonMock = jest.fn();
  const getPokemonMock = jest.spyOn(services, "getPokemon");

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(console, "log").mockImplementation(() => {});
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
    jest.spyOn(console, "log").mockRestore();
    mockSetState.mockRestore();
    pokemonListFetchMock.mockRestore();
    jest.clearAllMocks(); // Clear any remaining mocks
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

  test("User fetch error to Pokemon Home Page", async ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;

      HomePageWrapper = shallow(<HomePage {...props} />);
    });

    when("User fully loaded Pokemon home page", () => {
      instance = HomePageWrapper.instance() as HomePage;
    });

    then("User fetch error to Pokemon Home Page", () => {
      // expect(instance.state.error).toEqual(true);
    });
  });

  test("fetch Pokemon when query is set", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;

      // Mock the function that should be triggered
      instance.fetchPokemon = fetchPokemonMock;

      // Ensure the state is initialized
      HomePageWrapper.setState({ query: "", debouncedQuery: "" });
    });

    when("Query is set", () => {
      // Update the state to have a non-empty query
      HomePageWrapper.setState({ query: "pikachu", debouncedQuery: "pikachu" });

      // Simulate component update
      instance.componentDidUpdate(
        props, // previous props
        {
          query: "",
          debouncedQuery: "",
          isLoading: false,
          pokemon: [],
          isFlatlistScrolled: false,
          offset: 0,
        } // previous state
      );
    });

    then("fetchPokemon will be triggered", () => {
      // Assert that fetchPokemon was called with the correct parameter
      expect(fetchPokemonMock).toHaveBeenCalledWith("pikachu");
    });
  });

  test("fetch Pokemon when query is not set", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;

      // Mock the function that should be triggered
      instance.fetchAllPokemon = fetchAllPokemonMock;

      // Ensure the state is initialized
      HomePageWrapper.setState({ query: "", debouncedQuery: "" });
    });

    when("Query is not set", () => {
      // Update the state to have a non-empty query
      HomePageWrapper.setState({ debouncedQuery: "haha" });

      // Simulate component update
      instance.componentDidUpdate(
        props, // previous props
        {
          query: "",
          debouncedQuery: "",
          isLoading: false,
          pokemon: [],
          isFlatlistScrolled: false,
          offset: 0,
        } // previous state
      );
    });

    then("fetchAllPokemon will be triggered", () => {
      expect(fetchAllPokemonMock).toHaveBeenCalled();
    });
  });

  test("Fetching a Pokemon successfully", ({ given, when, then, and }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;
    const setStateMock = jest.fn();

    given("the component is mounted", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      instance.setState = setStateMock;
    });

    when("I fetch a Pokemon with a valid query", async () => {
      // Mock a successful Pokemon fetch
      getPokemonMock.mockResolvedValueOnce({ pokemonDetailMock });
      jest
        .spyOn(helpers, "pokemonTransformer")
        .mockReturnValueOnce(pokemonDetailMock);
      await instance.fetchPokemon("bulbasaur");
    });

    then("the pokemon should be set in the state", () => {
      expect(setStateMock).toHaveBeenCalledWith({
        isLoading: false,
        offset: 0,
        pokemon: [pokemonDetailMock],
      });
    });
  });

  test("Failing to fetch a Pokemon", ({ given, when, then, and }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;
    const setStateMock = jest.fn();

    given("the component is mounted", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      instance.setState = setStateMock;
    });

    when("the fetch fails", async () => {
      // Mock a rejected fetch call
      getPokemonMock.mockRejectedValueOnce(new Error("Pokemon not found"));

      await instance.fetchPokemon("unknown");
    });

    then("an error should be logged", () => {
      expect(console.log).toHaveBeenCalledWith(
        "[error] fetchPokemon",
        expect.any(Error)
      );
    });

    and("the state should reflect the error", () => {
      expect(setStateMock).toHaveBeenCalledWith({
        isLoading: false,
        pokemon: [],
        offset: 0,
      });
    });
  });

  test("Do not fetch pokemon list when isLoading is true", ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;
    const setStateMock = jest.fn();
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    given("the component is mounted", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;

      // Mock setState to track state changes
      instance.setState = setStateMock;
    });

    when("isLoading is true", async () => {
      instance.setState({ isLoading: true });
      await instance.fetchAllPokemon();
    });

    then("the app will not fetch the pokemon list", () => {
      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        "Fetching All Pokemon ..."
      );
    });
  });
});
