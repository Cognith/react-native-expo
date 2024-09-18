Feature: Pokemon Detail

    Scenario: Render Pokemon Detail
        Given I am on the Detail Page
        When I successfully load Detail Page
        Then I should see Bulbasaur

    Scenario: User types into the input field
        Given I am on the DetailPage
        When I type a query in the input field
        Then It should update the query state
        And It should debounce the query after 500ms

    Scenario: when debounceTimeout is not null
        Given debounceTimeout is set
        When onChangeText is triggered
        Then clearTimeout should be called

    Scenario: User fetch error to Pokemon Detail Page
        Given User on the Pokemon Detail page
        When User fully loaded Pokemon Detail page
        Then User fetch error to Pokemon Detail Page

    Scenario: fetch Pokemon when query is set
        Given User on the Pokemon Detail page
        When Query is set
        Then fetchPokemon will be triggered

    Scenario: fetch Pokemon when query is not set
        Given User on the Pokemon Detail page
        When Query is not set
        Then fetchPokemonFromParams will be triggered

    Scenario: Should update state with formatted stats when params.pokemon is present
        Given the component is mounted
        And the route params have a pokemon with id and stats
        When fetchPokemonFromParams is called
        Then the formattingStats function should be called with the pokemon stats
        And the state should be updated with the pokemon and formatted stats

    Scenario: Generate URL with name
        Given the options contain a name "bulbasaur"
        When generatePokemonURL is called
        Then the URL should be "https://pokeapi.co/api/v2/pokemon/bulbasaur"