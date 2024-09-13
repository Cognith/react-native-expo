Feature: Pokemon List

    Scenario: Render Pokemon Detail
        Given I am on the PokemonDetail Page
        When I successfully load PokemonDetail Page
        Then App should start to fetch pokemon detail data
        Then I should see the pokemon detail

