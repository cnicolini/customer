Feature: customers page
  As an application user, I need to obtain a list of customers
  so that I can review, modify, and add new customers.

  Scenario: Access customers page
    When I navigate to the customers page
    Then I should see a list of customers

  Scenario: User clicks the add button
    Given I am in the customers page
    When I click on the add button
    Then I navigate to the details page
    And the field name is empty
    And the field address is empty
