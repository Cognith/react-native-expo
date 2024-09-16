Feature: Pokemon List

    Scenario: Render Pokemon Detail
        Given I am on the PokemonDetail Page
        When I successfully load PokemonDetail Page
        Then App should start to fetch pokemon detail data
        Then I should see the pokemon detail

    Scenario: Should Go to url on press generation with link icon 
        Given I am on the PokemonDetail Page with pokemon detail loaded and generation url link exist
        When press on link icon
        Then should go to url

     Scenario: Should show alert if can not open url generation link
        Given I am on the PokemonDetail Page with pokemon detail loaded and generation url link undefined
        When press on link icon
        Then should show alert 

