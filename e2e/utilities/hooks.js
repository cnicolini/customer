const { Before, After, Status } = require('cucumber');
const { browser } = require('protractor');

Before(function(scenario) {
  browser.manage().window().maximize();
});

After(function(testCase) {
  if (testCase.result.status === Status.FAILED) {
    console.log(`After - Status - ${testCase.name}`);
    world = this;
    return browser.takeScreenshot().then(function(screenShot) {
      // screenShot is a base-64 encoded PNG
      world.attach(screenShot, 'image/png');
    });
  }
})
