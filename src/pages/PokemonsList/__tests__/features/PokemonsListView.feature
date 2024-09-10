Feature: Pokemon List

    Scenario: Render Pokemon List
        Given I am on the Pokemon List Page
        When I successfully load Pokemon List Page
        Then I should see a list of Pokemon
