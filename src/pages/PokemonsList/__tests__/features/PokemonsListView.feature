Feature: Pokemon List

  Scenario: User navigating to Pokemon List Page
    Given User on the Pokémon List page
    When User fully loaded the Pokémon List page
    Then User should see list page
    Then User should see loading
    When User is waiting for pokemons to load
    Then User will see 20 pokemons loaded initially
