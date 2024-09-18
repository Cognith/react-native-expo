import HomePage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import {
  pokemonDetailMock,
  pokemonDetailResponseMock,
  pokemonListMock,
  pokemonListResponseMock,
} from "../../../../__mocks__";
import * as services from "../../../../services";
import * as helpers from "../../../../helpers";
import { PokemonCard, PokemonList } from "../../../../components";
import { Pokemon } from "../../../../types";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/ComponentView.feature"
);

const initialState = {
  isLoading: false,
  pokemon: [],
  isFlatlistScrolled: false,
  offset: 0,
  query: "",
  debouncedQuery: "",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
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

  afterEach(() => {});

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

  test("should update state with new Pokémon on successful fetch", async ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given(
      "jest.spyOn is used to mock getPokemon with a resolved promise",
      () => {
        HomePageWrapper = shallow(<HomePage {...props} />);
        instance = HomePageWrapper.instance() as HomePage;
        jest
          .spyOn(services, "getPokemon")
          .mockResolvedValue(pokemonDetailResponseMock);
      }
    );

    when('fetchPokemon is called with "pikachu" query', async () => {
      instance.fetchPokemon("bulbasaur");
      HomePageWrapper.update();
    });

    then("it should update state and display the Pokémon name", () => {
      expect(instance.state).toEqual({
        ...initialState,
        isLoading: false,
        offset: 0,
        pokemon: [pokemonDetailMock],
      });
    });
  });

  test("Handle error when fetching all Pokemon", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("I am on the Home Page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      jest
        .spyOn(services, "getPokemonList")
        .mockRejectedValue(new Error("Mock Error: getPokemonList"));
      jest
        .spyOn(services, "getPokemon")
        .mockRejectedValue(new Error("Mock Error: getPokemon"));
    });

    when("I call the API and get error", async () => {
      await instance.fetchAllPokemon();
      await new Promise(setImmediate); // Wait for all promises (and setState) to resolve
      HomePageWrapper.update();
    });

    then("It should set isLoading to false in the state", () => {
      expect(instance.state).toEqual(initialState);
    });
  });

  test("Handle error when fetching Pokemon", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("I am on the Home Page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      jest
        .spyOn(services, "getPokemon")
        .mockRejectedValue(new Error("Network Error"));
    });

    when("I call the API and get error", async () => {
      await instance.fetchPokemon("bulbasaur");
      HomePageWrapper.update();
    });

    then(
      "It should set isLoading to false and pokemon to null in the state",
      () => {
        expect(instance.state).toEqual(initialState);
      }
    );
  });

  test("fetch Pokemon when query is set", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      jest.spyOn(instance, "fetchPokemon");
    });

    when("Query is set", async () => {
      const searchBar = HomePageWrapper.find('[data-test-id="search-bar"]');
      searchBar.simulate("changeText", "bulbasaur");

      // Simulate timeout in onChangeText function
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    then("fetchPokemon will be triggered", () => {
      expect(instance.fetchPokemon).toHaveBeenCalledWith("bulbasaur");
    });
  });

  test("fetch Pokemon when query is not set", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;
      jest.spyOn(instance, "fetchAllPokemon");

      // Simulate state when user has already performed a previous search
      instance.setState({
        ...initialState,
        query: "bulbasaur",
        debouncedQuery: "bulbasaur",
      });
    });

    when("Query is not set", async () => {
      const searchBar = HomePageWrapper.find('[data-test-id="search-bar"]');
      searchBar.simulate("changeText", "");

      // Simulate timeout in onChangeText function
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    then("fetchAllPokemon will be triggered", () => {
      expect(instance.fetchAllPokemon).toHaveBeenCalled();
    });
  });

  test("clearTimeout if debounceTimeout is not null", ({
    given,
    when,
    then,
  }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomePage;

    given("debounceTimeout is set", () => {
      HomePageWrapper = shallow(<HomePage {...props} />);
      instance = HomePageWrapper.instance() as HomePage;

      // Simulate when debounceTimeout is already set
      instance.debounceTimeout = setTimeout(() => {}, 500);

      jest.spyOn(global, "clearTimeout");
    });

    when("onChangeText is triggered", () => {
      const searchBar = HomePageWrapper.find('[data-test-id="search-bar"]');
      searchBar.simulate("changeText", "pikachu");
    });

    then("clearTimeout should be called", () => {
      expect(clearTimeout).toHaveBeenCalled();
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

      jest.spyOn(instance, "setState");

      // Simulate the state is already set as expected condition
      instance.setState({ isFlatlistScrolled: false });
    });

    when("I trigger the onScrollBeginDrag function", () => {
      const pokemonList = HomePageWrapper.find('[data-test-id="pokemon-list"]');
      pokemonList.simulate("scrollBeginDrag");
    });

    then("it should update the isFlatlistScrolled state to true", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isFlatlistScrolled: true,
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

      jest.spyOn(instance, "fetchAllPokemon");
      jest.spyOn(instance, "setState");

      // Simulate the state are already set as expected condition
      instance.setState({
        isFlatlistScrolled: true,
        query: "",
      });
    });

    when("I trigger the onEndReached function", () => {
      const pokemonList = HomePageWrapper.find('[data-test-id="pokemon-list"]');
      pokemonList.simulate("endReached");
    });

    then("it should fetch more Pokemon", () => {
      expect(instance.fetchAllPokemon).toHaveBeenCalledWith(20);
    });

    then("it should update the offset state", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        offset: 20,
      });
    });
  });
});
