Feature: Pokemon Detail

    Scenario: Render Pokemon Detail
        Given I am on the Detail Page
        When I successfully load Detail Page
        Then I should see Bulbasaur

    Scenario: User types into the input field
        Given I am on the HomePage
        When I type a query in the input field
        Then It should update the query state
        And It should debounce the query after 500ms