Feature: Home Page

  Scenario: Render Pokemon List
    Given I am on the Home Page
    When I successfully load Home Page
    Then I should see a search bar and Pokemon list
    And I should see the loading indicator when loading
    And I should see the Pokemon list when not loading

  Scenario: Handle Search Input
    Given I am on the Home Page
    When I enter a search query
    Then I should see filtered results based on the search query

  Scenario: Handle Load More
    Given I am on the Home Page
    When I scroll to load more Pokémon
    Then I should fetch and display more Pokémon

  Scenario: Component initializes with default state
    Given The Home Page component is rendered
    Then The component should initialize with the correct state

  Scenario: Handle empty data state
    Given I am on the Home Page with no data
    When I load the page
    Then The component should handle empty data gracefully
