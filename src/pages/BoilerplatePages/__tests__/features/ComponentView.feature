Feature: Home Page

  Scenario: User interacts with the search bar and the list updates accordingly
    Given I am on the Home Page
    When I change the search query to "Pikachu"
    Then The search query should be updated and the list should reflect the search results

  Scenario: User navigates to the Detail page when a Pokémon is pressed
    Given I am on the Home Page
    When I press on the "Pikachu" Pokémon item
    Then I should be navigated to the Detail page for Pikachu

  Scenario: User sees a loading indicator while data is being fetched
    Given I am on the Home Page
    When the page is loading
    Then I should see a loading indicator
