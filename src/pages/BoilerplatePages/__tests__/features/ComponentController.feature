Feature: HomeController

  Scenario: Initialization
    Given I am using the HomeController component
    Then it should initialize with the correct state

  Scenario: Fetching Pokemon Data
    Given I am using the HomeController component
    When I fetch Pokemon data
    Then it should update the state with fetched Pokemon data

  Scenario: Handling Load More
    Given I have fetched some Pokemon data
    When I handle load more
    Then it should fetch more Pokemon data and update the offset

  Scenario: Handling Search
    Given I have a list of Pokemon
    When I perform a search with a query
    Then it should filter the Pokemon list based on the query
