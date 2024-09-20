Feature: Pokemon List

    Scenario: Render Pokemon List
        Given I am on the Home Page
        When I successfully load Home Page
        Then I should see Pokemon list
        And FlatList should has keyExtractor
        And The Pokemon list should be rendered

    Scenario: Render loading FlatList
        Given I am on the Home Page
        When The isLoading is true
        Then ActivityIndicator should be displayed

    Scenario: Render Pokemon Not Found text
        Given I am on the Home Page
        When The isLoading is false
        Then Pokemon Not Found text should be displayed

    Scenario: Search unknown pokemon
        Given I am on the Home Page
        When User search unknown pokemon
        Then Pokemon Not Found text should be displayed

    Scenario: should update state with new Pokémon on successful fetch
        Given jest.spyOn is used to mock getPokemon with a resolved promise
        When fetchPokemon is called with "pikachu" query
        Then it should update state and display the Pokémon name

    Scenario: Handle error when fetching all Pokemon
        Given I am on the Home Page
        When I call the API and get error
        Then It should set isLoading to false in the state

    Scenario: Handle error when fetching Pokemon
        Given I am on the Home Page
        When I call the API and get error
        Then It should set isLoading to false and pokemon to null in the state

    Scenario: fetch Pokemon when query is set
        Given User on the Pokemon Home page
        When Query is set
        Then fetchPokemon will be triggered

    Scenario: fetch Pokemon when query is not set
        Given User on the Pokemon Home page
        When Query is not set
        Then fetchAllPokemon will be triggered

    Scenario: clearTimeout if debounceTimeout is not null
        Given debounceTimeout is set
        When onChangeText is triggered
        Then clearTimeout should be called

    Scenario: onScrollBeginDrag is triggered when isFlatlistScrolled is false
        Given the flatlist has not been scrolled
        When I trigger the onScrollBeginDrag function
        Then it should update the isFlatlistScrolled state to true

    Scenario: onEndReached is triggered and conditions are met
        Given the flatlist has scrolled and query is an empty string
        When I trigger the onEndReached function
        Then it should fetch more Pokemon
        And it should update the offset state