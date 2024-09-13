import { defineFeature, loadFeature } from "jest-cucumber";
import { mount, ReactWrapper } from "enzyme";
import HomePage from "../../ComponentView";
import React from "react";
import {
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParam } from "../../ComponentView";
import * as helpers from "../../../../helpers";

const feature = loadFeature(
  "./src/pages/BoilerplatePages/__tests__/features/ComponentView.feature"
);

type HomePageProps = NativeStackScreenProps<RootStackParam, "Home">;

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    global.fetch = jest.fn((url) => {
      if (url.includes("baseURL")) {
        return Promise.resolve({
          json: () => Promise.resolve([{ id: 1, name: "Pikachu" }]),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: "Pikachu" }),
      });
    }) as jest.Mock;
  });

  test("Render Pokemon List", ({ given, when, then, and }) => {
    let HomePageWrapper: ReactWrapper;
    const mockNavigation = { navigate: jest.fn() } as any;
    const mockRoute = { params: {} } as any;

    given("I am on the Home Page", () => {
      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
    });

    when("I successfully load Home Page", () => {
      jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([false, jest.fn()]); // For loading
    });

    then("I should see a search bar and Pokemon list", () => {
      const searchBar = HomePageWrapper.find(TextInput);
      expect(searchBar.exists()).toBe(true);

      const flatList = HomePageWrapper.find(FlatList);
      expect(flatList.exists()).toBe(true);
    });

    and("I should see the loading indicator when loading", () => {
      jest.spyOn(React, "useState").mockReturnValueOnce([true, jest.fn()]);

      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
      const activityIndicator = HomePageWrapper.find(ActivityIndicator);
      expect(activityIndicator.exists()).toBe(true);
    });

    and("I should see the Pokemon list when not loading", () => {
      jest.spyOn(React, "useState").mockReturnValueOnce([false, jest.fn()]);

      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
      const flatList = HomePageWrapper.find(FlatList);
      expect(flatList.exists()).toBe(true);
    });
  });

  test("Handle Search Input", ({ given, when, then }) => {
    let HomePageWrapper: ReactWrapper;
    const mockNavigation = { navigate: jest.fn() } as any;
    const mockRoute = { params: {} } as any;

    given("I am on the Home Page", () => {
      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
    });

    when("I enter a search query", () => {
      jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([false, jest.fn()]);

      // Directly invoke onChangeText
      const textInput = HomePageWrapper.find(TextInput);
      const onChangeText = textInput.prop("onChangeText") as (
        text: string
      ) => void;
      if (onChangeText) {
        onChangeText("Pikachu");
      }
    });

    then("I should see filtered results based on the search query", () => {
      const filteredList = HomePageWrapper.find(FlatList).prop("data");
      expect(filteredList).toEqual([{ id: 1, name: "Pikachu" }]);
    });
  });

  test("Handle Load More", ({ given, when, then }) => {
    let HomePageWrapper: ReactWrapper;
    const mockNavigation = { navigate: jest.fn() } as any;
    const mockRoute = { params: {} } as any;

    given("I am on the Home Page", () => {
      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
    });

    when("I scroll to load more Pokémon", () => {
      jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([["Pikachu", "Bulbasaur"], jest.fn()])
        .mockReturnValueOnce([true, jest.fn()]);

      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([{ id: 3, name: "Charmander" }]),
        } as Response)
      );

      (HomePageWrapper.instance() as any).handleLoadMore();
    });

    then("I should fetch and display more Pokémon", () => {
      const flatList = HomePageWrapper.find(FlatList);

      expect(flatList.prop("data")).toEqual(
        expect.arrayContaining([{ id: 3, name: "Charmander" }])
      );
    });
  });

  test("Component initializes with default state", ({ given, then }) => {
    let HomePageWrapper: ReactWrapper;
    const mockNavigation = { navigate: jest.fn() } as any;
    const mockRoute = { params: {} } as any;

    given("The Home Page component is rendered", () => {
      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
    });

    then("The component should initialize with the correct state", () => {
      const instance = HomePageWrapper.instance() as any;
      expect(instance.state).toEqual({
        pokemonList: [],
        filteredPokemonList: [],
        loading: true,
        loadingMore: false,
        offset: 0,
        searchQuery: "",
      });
    });
  });

  test("Handle empty data state", ({ given, when, then }) => {
    let HomePageWrapper: ReactWrapper;
    const mockNavigation = { navigate: jest.fn() } as any;
    const mockRoute = { params: {} } as any;

    given("I am on the Home Page with no data", () => {
      jest
        .spyOn(React, "useState")
        .mockReturnValueOnce([[], jest.fn()])
        .mockReturnValueOnce([[], jest.fn()])
        .mockReturnValueOnce([false, jest.fn()]);

      HomePageWrapper = mount(
        <SafeAreaProvider>
          <HomePage navigation={mockNavigation} route={mockRoute} />
        </SafeAreaProvider>
      );
    });

    when("I load the page", () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        } as Response)
      );

      (HomePageWrapper.instance() as any).componentDidMount();
    });

    then("The component should handle empty data gracefully", () => {
      const flatList = HomePageWrapper.find(FlatList);
      expect(flatList.prop("data")).toEqual([]);
      const noDataMessage = HomePageWrapper.find(Text).findWhere(
        (node) => node.text() === "No Pokémon available"
      );
      expect(noDataMessage.exists()).toBe(true);
    });
  });
});
