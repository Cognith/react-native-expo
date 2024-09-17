Feature: Pokemon Details

    Scenario: Render Pokemon Details Page
        Given User is on the Pokemon Details Page
        When the Pokemon Details Page is loaded
        Then User should see the details of a Pokemon
        When User presses on the "Back" arrow button
        Then User should navigate back to the Pokemon List Page
