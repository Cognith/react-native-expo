Feature: Pokemon List

  Scenario: User navigating to Pokemon List Page
    Given User is on the Pokemon List page
    When User loaded the initial state of Pokemon List page
    Then User should see the list page
    Then User should see loading indicator
    When User is waiting for pokemons to load
    Then User will see 20 pokemons loaded initially
    Then User should see a Pokemon named "Bulbasaur"

  Scenario: User navigating to Pokemon List Page with error
    Given User is on the Pokemon List Page
    When there is an error loading the Pokemon List Page
    Then User should see a message "Error:"

  Scenario: User navigating to Pokemon List Page and scroll down to load more Pokemons
    Given User is on the Pokemon List Page
    When User loaded the initial state of Pokemon List page
    Then User should see the list page
    When User sees initial pokemons loaded and scroll down quickly to the end of the list
    Then User should see a loading indicator at the end of the list
    When User is waiting for more pokemons to load
    Then User should see more Pokemons loaded

  Scenario: User searching for a Pokemon in Pokemon List Page
    Given User is on the Pokemon List Page
    When User loaded the initial state of Pokemon List page
    Then User should see the list page
    When User type part of a Pokemon's name in the search input
    Then User should see a list of Pokemons found by the name
