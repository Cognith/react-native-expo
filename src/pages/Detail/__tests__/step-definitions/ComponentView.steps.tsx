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
  const fetchPokemonMock = jest.fn();
  const fetchPokemonFromParamsMock = jest.fn();
  const formattingStatsMock = jest.fn();
  const consoleLogMock = jest
    .spyOn(console, "log")
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonDetailResponseMock),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    mockSetState.mockRestore();
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
    given("I am on the DetailPage", () => {
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

  test("when debounceTimeout is not null", ({ given, when, then }) => {
    let DetailPageWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("debounceTimeout is set", () => {
      DetailPageWrapper = shallow(<DetailPage {...props} />);
      instance = DetailPageWrapper.instance() as DetailPage;

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
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("User on the Pokemon Home page", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;

      PokemonHomeWrapper = shallow(<DetailPage {...props} />);
    });

    when("User fully loaded Pokemon home page", () => {
      instance = PokemonHomeWrapper.instance() as DetailPage;
    });

    then("User fetch error to Pokemon Home Page", () => {
      // expect(instance.state.error).toEqual(true);
    });
  });

  test("fetch Pokemon when query is set", ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("User on the Pokemon Detail page", () => {
      PokemonHomeWrapper = shallow(<DetailPage {...props} />);
      instance = PokemonHomeWrapper.instance() as DetailPage;

      // Mock the function that should be triggered
      instance.fetchPokemon = fetchPokemonMock;

      // Ensure the state is initialized
      PokemonHomeWrapper.setState({ query: "", debouncedQuery: "" });
    });

    when("Query is set", () => {
      // Update the state to have a non-empty query
      PokemonHomeWrapper.setState({
        query: "pikachu",
        debouncedQuery: "pikachu",
      });

      // Simulate component update
      instance.componentDidUpdate(
        props, // previous props
        {
          query: "",
          debouncedQuery: "",
          isLoading: false,
          pokemon: null,
        } // previous state
      );
    });

    then("fetchPokemon will be triggered", () => {
      // Assert that fetchPokemon was called with the correct parameter
      expect(fetchPokemonMock).toHaveBeenCalledWith({ name: "pikachu" });
    });
  });

  test("fetch Pokemon when query is not set", ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: DetailPage;

    given("User on the Pokemon Detail page", () => {
      PokemonHomeWrapper = shallow(<DetailPage {...props} />);
      instance = PokemonHomeWrapper.instance() as DetailPage;

      // Mock the function that should be triggered
      instance.fetchPokemonFromParams = fetchPokemonFromParamsMock;

      // Ensure the state is initialized
      PokemonHomeWrapper.setState({ query: "", debouncedQuery: "" });
    });

    when("Query is not set", () => {
      // Update the state to have a non-empty query
      PokemonHomeWrapper.setState({ debouncedQuery: "haha" });

      // Simulate component update
      instance.componentDidUpdate(
        props, // previous props
        {
          query: "",
          debouncedQuery: "",
          isLoading: false,
          pokemon: null,
        } // previous state
      );
    });

    then("fetchPokemonFromParams will be triggered", () => {
      expect(fetchPokemonFromParamsMock).toHaveBeenCalled();
    });
  });

  test("Should update state with formatted stats when params.pokemon is present", ({
    given,
    when,
    then,
  }) => {
    given("the component is mounted", () => {
      DetailPageWrapper = shallow(<DetailPage {...props} />);
      instance = DetailPageWrapper.instance() as DetailPage;
      instance.setState = mockSetState;
      instance.formattingStats = formattingStatsMock;
    });

    given("the route params have a pokemon with id and stats", () => {
      formattingStatsMock.mockReturnValue(pokemonDetailMock.stats);
    });

    when("fetchPokemonFromParams is called", () => {
      instance.fetchPokemonFromParams();
    });

    then(
      "the formattingStats function should be called with the pokemon stats",
      () => {
        expect(formattingStatsMock).toHaveBeenCalledWith(
          pokemonDetailMock.stats
        );
      }
    );

    then(
      "the state should be updated with the pokemon and formatted stats",
      () => {
        expect(mockSetState).toHaveBeenCalledWith({
          pokemon: pokemonDetailMock,
        });
      }
    );
  });

  test("Generate URL with name", ({ given, when, then }) => {
    let options: { id?: number; name?: string };
    let result: string;

    given('the options contain a name "bulbasaur"', () => {
      options = { name: "bulbasaur" };
    });

    when("generatePokemonURL is called", () => {
      result = instance.generatePokemonURL(options);
    });

    then(
      'the URL should be "https://pokeapi.co/api/v2/pokemon/bulbasaur"',
      () => {
        expect(result).toBe("https://pokeapi.co/api/v2/pokemon/bulbasaur");
      }
    );
  });
});
