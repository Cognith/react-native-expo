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

    Scenario: User fetch error to Pokemon Home Page
        Given User on the Pokemon Home page
        When User fully loaded Pokemon home page
        Then User fetch error to Pokemon Home Page

    Scenario: fetch Pokemon when query is set
        Given User on the Pokemon Home page
        When Query is set
        Then fetchPokemon will be triggered

    Scenario: fetch Pokemon when query is not set
        Given User on the Pokemon Home page
        When Query is not set
        Then fetchAllPokemon will be triggered

    Scenario: Fetching a Pokemon successfully
        Given the component is mounted
        When I fetch a Pokemon with a valid query
        Then the pokemon should be set in the state

    Scenario: Failing to fetch a Pokemon
        Given the component is mounted
        When the fetch fails
        Then an error should be logged
        And the state should reflect the error

    Scenario: Do not fetch pokemon list when isLoading is true
        Given the component is mounted
        When isLoading is true
        Then the app will not fetch the pokemon list