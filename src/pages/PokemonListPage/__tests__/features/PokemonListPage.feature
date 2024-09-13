Feature: Pokemon List

    Scenario: Render Pokemon List
        Given I am on the PokemonList Page
        When I successfully load PokemonList Page
        Then I should see search Input 
        Then App should start to fetch pokemon data
        Then I should see the list of pokemon 

    Scenario: Pokemon List infinite scroll
        Given I am on the PokemonListPage with pokemon list loaded
        When I scroll down
        Then it should load more pokemon
        Then I should see it the more pokemon is loaded on the screen

    Scenario: Search Pokemon List
        Given I am on the PokemonListPage with pokemon list
        When I search Pokemon by name
        Then I should only see the pokemon that contains the keyword in the search Input