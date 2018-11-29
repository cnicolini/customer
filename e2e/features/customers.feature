Feature: customers page
  As an application user, I need to obtain a list of customers
  so that I can review, modify, and add new customers.

  Scenario: Access customers page
    Given I am in the customers page
    Then I should see a list of customers

  Scenario: User clicks the add button
    Given I am in the customers page
    When I click on the add button
    Then I navigate to the details page
    And the field name is empty
    And the field address is empty

  Scenario: User enters a new customer
    Given I am in the customers page
    And I click on the add button
    And I enter "Darth Vader" as the name
    And I enter "263 Great Valley Parkway, Malvern PA 19355, USA" as the address
    When I click the save button
    Then the new customer is created with a valid ID
