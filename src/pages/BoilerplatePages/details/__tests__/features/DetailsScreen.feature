Feature: Details Screen

  Scenario: Render Details Component
    Given I am on the Details Screen
    When I provide a valid pokemonUrl
    Then I should see the details for the Pokémon
