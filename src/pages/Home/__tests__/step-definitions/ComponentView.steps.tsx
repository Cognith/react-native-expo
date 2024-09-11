import HomePage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/ComponentView.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn((url) => {
      if (url.startsWith("https://pokeapi.co/api/v2/pokemon?offset=")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              count: 1302,
              next: "https://pokeapi.co/api/v2/pokemon?offset=undefined&limit=20",
              previous: null,
              results: [
                {
                  name: "bulbasaur",
                  url: "https://pokeapi.co/api/v2/pokemon/1/",
                },
              ],
            }),
        });
      }
      if (url.startsWith("https://pokeapi.co/api/v2/pokemon/")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 1,
              name: "bulbasaur",
              species: {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon-species/1/",
              },
              sprites: {
                front_shiny:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
              },
              stats: [
                {
                  base_stat: 45,
                  effort: 0,
                  stat: {
                    name: "hp",
                    url: "https://pokeapi.co/api/v2/stat/1/",
                  },
                },
                {
                  base_stat: 49,
                  effort: 0,
                  stat: {
                    name: "attack",
                    url: "https://pokeapi.co/api/v2/stat/2/",
                  },
                },
                {
                  base_stat: 49,
                  effort: 0,
                  stat: {
                    name: "defense",
                    url: "https://pokeapi.co/api/v2/stat/3/",
                  },
                },
                {
                  base_stat: 65,
                  effort: 1,
                  stat: {
                    name: "special-attack",
                    url: "https://pokeapi.co/api/v2/stat/4/",
                  },
                },
                {
                  base_stat: 65,
                  effort: 0,
                  stat: {
                    name: "special-defense",
                    url: "https://pokeapi.co/api/v2/stat/5/",
                  },
                },
                {
                  base_stat: 45,
                  effort: 0,
                  stat: {
                    name: "speed",
                    url: "https://pokeapi.co/api/v2/stat/6/",
                  },
                },
              ],
              types: [
                {
                  slot: 1,
                  type: {
                    name: "grass",
                    url: "https://pokeapi.co/api/v2/type/12/",
                  },
                },
                {
                  slot: 2,
                  type: {
                    name: "poison",
                    url: "https://pokeapi.co/api/v2/type/4/",
                  },
                },
              ],
            }),
        });
      }
    }) as jest.Mock;
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
});
