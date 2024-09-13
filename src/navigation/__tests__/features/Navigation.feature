Feature: Navigation and Header Verification

  Scenario: Navigate from Home Page to Details Page
    Given I am on the Home Page
    When I press on a Pokémon item
    Then I should see the Details Page with Pokémon information

  Scenario: Verify Home Page header
    Given I am on the Home Page
    Then I should see the Home Page header with title "PokeList"
    And the header style should be black with white text

  Scenario: Verify Details Page header
    Given I am on the Details Page
    Then I should see the Details Page header with title "Pokemon Details"
    And the header style should be black with white text
