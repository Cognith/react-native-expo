Feature: Pokemon List

    Scenario: Render Pokemon List
        Given I am on the Home Page
        When I successfully load Home Page
        Then I should see Hello World

    Scenario: User types into the input field
        Given I am on the HomePage
        When I type a query in the input field
        Then It should update the query state
        And It should debounce the query after 500ms

    Scenario: Navigating to the detail screen
        Given I am on the home page
        When I navigate to the detail screen for a Pokemon
        Then the navigation should occur with the correct Pokemon data