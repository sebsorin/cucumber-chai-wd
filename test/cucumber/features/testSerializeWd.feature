Feature: Running normal protractor tests with cucumber

  @dev
  Scenario: Running Cucumber with Protractor return an element within an array
    Given I run Cucumber with Protractor
    Then it should return not present when an element disappears within an array
 

  @dev
  Scenario: Running Cucumber with Protractor get element in an array
    Given I run Cucumber with Protractor
    Then it should get an element from an array
    Then it should get an element from an array using should
