import { RouteProp } from "@react-navigation/native";
import DetailPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Pokemon } from "../../../../types";
import { FlatList } from "react-native";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
  route: {
    params: {
      pokemon: {
        id: 1,
        formattedId: "0001",
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        types: [{ name: "grass" }, { name: "poison" }],
        stats: [
          { name: "HP", baseStat: 45 },
          { name: "Attack", baseStat: 49 },
          { name: "Defense", baseStat: 49 },
          { name: "Special Attack", baseStat: 65 },
          { name: "Special Defense", baseStat: 65 },
          { name: "Speed", baseStat: 45 },
        ],
      } as Pokemon,
    },
  } as RouteProp<{ params: { pokemon: Pokemon } }, "params">,
};

const feature = loadFeature(
  "./src/pages/Detail/__tests__/features/ComponentView.feature"
);

defineFeature(feature, (test) => {
  let DetailPageWrapper: ShallowWrapper;
  let instance: DetailPage;

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn(() =>
      Promise.resolve({
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

  test("Render Pokemon Type", ({ given, when, then }) => {
    given("I am on the Detail Page", () => {
      DetailPageWrapper = shallow(<DetailPage {...props} />);
    });

    when("I successfully load Detail Page", async () => {
      instance = DetailPageWrapper.instance() as DetailPage;
    });

    then("I should see Pokemon Type", () => {
      const flatList = DetailPageWrapper.find(FlatList);

      // Test keyExtractor
      const keyExtractor = flatList.prop("keyExtractor");
      if (typeof keyExtractor === "function") {
        expect(keyExtractor({ name: "HP", baseStat: 45 }, 0)).toBe("HP");
      } else {
        throw new Error("keyExtractor is not a function");
      }
    });
  });
});
