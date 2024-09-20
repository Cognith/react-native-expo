Feature: HomePage functionality

  Scenario: User interacts with the search bar and the list updates accordingly
    Given I am on the Home Page
    When I change the search query to "Pikachu"
    Then The search query should be updated and the list should reflect the search results
