Feature: Pokemon List

  Scenario: User navigating to Pokemon List Page
    Given User on the Pokémon List page
    When User fully loaded the Pokémon List page
    Then User should see list page
    Then User should see loading
    When User is waiting for pokemons to load
    Then User will see 20 pokemons loaded initially
    Then User should see a Pokemon named "Bulbasaur"

  Scenario: User navigating to Pokemon Home Page with error
    Given User is on the Pokemon List Page
    When there is an error loading the Pokemon List Page
    Then User should see a message "Error:"
