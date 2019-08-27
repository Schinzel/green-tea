# Intro
Green Tea is a JavaScript UI and unit testing framework.
Tests are written in and executed using JavaScript only. 
The results of these tests are rendered as HTML.

# Integrating with Selenium
To integrate with existing systems, a Selenium test can be implemented that reads the
HTML pages with test results and the Selenium test fails if the number of failed test is one or 
more in one or more test reuslt pages.

# Examples
Run the Java class `WebServerStarter`

[Unit Test Example](http://localhost:5555/java_script_tests/unit/example/MyClassTest.html)

[UI Test Example](http://localhost:5555/java_script_tests/ui/example/MyWebAppTest.html)

# UI Tests
The problem this part of the framework attempts to solve is to make UI testing less painful 
than writing and running Selenium tests.

Selenium tests are a pain because
- They are slow to execute
- Selenium code for finding elements is clunky
- Writing Selenium code waiting for an element to appear or to become visible is bug prone

This framework is
- Faster than Selenium
- Normal jQuery code is used to find elements which does it much better than Selenium and is a
syntax that is well known to many developers
- A custom class `Sandman` makes it a lot easier and robust to wait for elements appear, become visible and so on

# Unit Tests
The unit tests simply solves the problems of having unit tests for JavaScrips classes.

# Creating a Test
1. Create an empty HTML file which will hold the tests
2. Import classes
    * For UI tests: `JavaScriptUITester` and `UIAssertThat`
    * For unit tests: `JavaScriptUnitTester` and `UnitAssertThat`
3. In your HTML file create a class with at least one test
    * For UI tests: let you class extend `AbstractTest`
4. Add the test class to `JavaScriptUITester` or `JavaScriptUnitTester`. See example files for syntax.
5. Load your HTML file in a browser
    
# Special Methods
The following methods are assumed not to be tests and will not be run as tests:
- the constructor
- `beforeTests` and `beforeEachTest`
- methods that start with underscore

Code in the optional method `beforeTests` will run once before any tests is run.

Code in the optional method `beforeEachTest` will run before every test method. 

### Note 
jQuery 2.2.4 is used as to have access to the selector property that has been removed from later
versions of jQuery.