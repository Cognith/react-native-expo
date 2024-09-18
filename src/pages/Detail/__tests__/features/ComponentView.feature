Feature: Pokemon Detail

    Scenario: Render Pokemon Detail
        Given I am on the Detail Page
        When I successfully load Detail Page
        Then I should see Bulbasaur

    Scenario: Handle error when fetching Pokemon
        Given I am on the Detail Page
        When I call the API and get error
        Then It should set isLoading to false and pokemon to null in the state