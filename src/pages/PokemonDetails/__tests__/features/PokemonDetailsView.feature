Feature: Pokemon Details

    Scenario: Render Pokemon Details
        Given I am on the Pokemon Details Page
        When I successfully load Pokemon Details Page
        Then I should see the details of a Pokemon
