Feature: Pokemon List

  Scenario: Pokemon List Page loading data successfully
    Given User is on the Pokemon List page
    When initially loading the Pokemon List page
    Then User should see the list page screen
    Then User should see the loading indicator
    When the first list of pokemons are loaded
    Then User should see 20 pokemons loaded initially
    Then User should see a Pokemon named "pokemon-1"

  Scenario: Pokemon List Page loaded with known error
    Given User is on the Pokemon List Page
    When there is an error loading the Pokemon List Page
    Then User should see a message with "Error:"
    Then User should see "Some known error" message for a known error

  Scenario: Pokemon List Page loaded with unknown error
    Given User is on the Pokemon List Page
    When there is an unknown error loading the Pokemon List Page
    Then User should see a message with "Error:"
    Then User should see "Unknown error" message for an unknown error

  Scenario: Scrolling down to load more Pokemons in Pokemon List Page
    Given User is on the Pokemon List Page
    When the first list of pokemons are loaded
    Then User should see 20 pokemons loaded initially
    When User scrolls down quickly to the end of the list
    Then User should see a loading indicator at the end of the list
    When more pokemons have successfully loaded
    Then User should see more Pokemons loaded
    When there are no more pokemons to load after scrolling again
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
    When User presses on a Pokemon item with the name "pokemon-5"
    Then User should navigate to the Pokemon details page

  Scenario: Pokemon List Page successfully loaded data but with one error
    Given User is on the Pokemon List Page
    When the pokemons are loaded except one
    Then User should see 19 pokemons loaded successfully

  Scenario: Render Pokemon List Page with no more pages to load
    Given User has scrolled through all available pokemon and no more pages are available
    When User attempts to load more pokemon
    Then No additional pokemon should be fetched and loading should not continue
