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

    Scenario: onEndReached is triggered and conditions are met
        Given the flatlist has scrolled and query is an empty string
        When I trigger the onEndReached function
        Then it should fetch more Pokemon
        And it should update the offset state

    Scenario: onScrollBeginDrag is triggered when isFlatlistScrolled is false
        Given the flatlist has not been scrolled
        When I trigger the onScrollBeginDrag function
        Then it should update the isFlatlistScrolled state to true

    Scenario: when debounceTimeout is not null
        Given debounceTimeout is set
        When onChangeText is triggered
        Then clearTimeout should be called