import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Navigation from "../../Navigation";
import { NavigationContainer } from "@react-navigation/native";

const feature = loadFeature(
  "./src/navigation/__tests__/features/Navigation.feature"
);

defineFeature(feature, (test) => {
  test("Navigate from Home Page to Details Page", ({ given, when, then }) => {
    let navigator: any;

    given("I am on the Home Page", () => {
      navigator = render(
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      );

      expect(screen.getByText("Search Pokemon by name or ID")).toBeTruthy();
    });

    when("I press on a Pokémon item", () => {
      const item = screen.getAllByText(/Pikachu|Bulbasaur/)[0];
      fireEvent.press(item);
    });

    then("I should see the Details Page with Pokémon information", () => {
      expect(screen.getByText("Pokemon Details")).toBeTruthy();
    });
  });

  test("Verify Home Page header", ({ given, then }) => {
    given("I am on the Home Page", () => {
      render(
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      );
    });

    then('I should see the Home Page header with title "PokeList"', () => {
      expect(screen.getByText("PokeList")).toBeTruthy();
    });

    then("the header style should be black with white text", () => {
      const header = screen.getByText("PokeList").parent;
      const headerStyle = header.props.style || {};
      expect(headerStyle.backgroundColor).toBe("black");
      expect(headerStyle.color).toBe("white");
    });
  });

  test("Verify Details Page header", ({ given, then }) => {
    given("I am on the Details Page", () => {
      render(
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      );

      const item = screen.getAllByText(/Pikachu|Bulbasaur/)[0];
      fireEvent.press(item);
    });

    then(
      'I should see the Details Page header with title "Pokemon Details"',
      () => {
        expect(screen.getByText("Pokemon Details")).toBeTruthy();
      }
    );

    then("the header style should be black with white text", () => {
      const header = screen.getByText("Pokemon Details").parent;
      const headerStyle = header.props.style || {};
      expect(headerStyle.backgroundColor).toBe("black");
      expect(headerStyle.color).toBe("white");
    });
  });
});
