Feature: Pokemon Detail

    Scenario: Render Pokemon Detail
        Given I am on the Detail Page
        When I successfully load Detail Page
        Then I should see Bulbasaur

    Scenario: Render Pokemon Type
        Given I am on the Detail Page
        When I successfully load Detail Page
        Then I should see Pokemon Type
