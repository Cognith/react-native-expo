Feature: Pokemon List

  Scenario: Pokemon List Page loading data successfully
    Given User is on the Pokemon List page
    When initially loading the Pokemon List page
    Then User should see the list page screen
    Then User should see the loading indicator
    When the first list of pokemons are loaded
    Then User should see 20 pokemons loaded initially
    Then User should see a Pokemon named "pokemon-1"

  Scenario: Pokemon List Page loaded with error
    Given User is on the Pokemon List Page
    When there is an error loading the Pokemon List Page
    Then User should see a message with "Error:"

  Scenario: Scrolling down to load more Pokemons in Pokemon List Page
    Given User is on the Pokemon List Page
    When the first list of pokemons are loaded
    Then User should see 20 pokemons loaded initially
    When User scrolls down quickly to the end of the list
    Then User should see a loading indicator at the end of the list
    When more pokemons have successfully loaded
    Then User should see more Pokemons loaded
    When there are no more pokemons after scroll
    Then User should not see a loading indicator at the end of the list

  Scenario: Searching for Pokemons in Pokemon List Page
    Given User is on the Pokemon List Page
    When the first list of pokemons are loaded
    Then User should see 20 pokemons loaded initially
    When User type part of a Pokemon's name in the search input
    Then User should see a list of Pokemons found by the name
    When User search for unavailable Pokemon in the search input
    Then User should see "No Pokemon is found" message

  Scenario: Navigate to a Pokemon's Details page from the Pokemon List Page
    Given User is on the Pokemon List Page
    When User loaded the initial state of Pokemon List page
    Then User should see the list page
    When User presses on a Pokemon item
    Then User should navigate to the Pokemon details page
