const assert = require("assert");
const userPassword = process.env.PASSWORD;
const userEmail = "alexanderkulikov94@gmail.com";
const $email = '[data-autotest-id="mr-form-login-email-1"]';
const $password = '[data-autotest-id="mr-form-login-password-1"]';
const $signUpButton = ".signup__submit";
const $error = ".signup__error-item";
const $emptypassword =
  '[data-autotest-id="mr-error-please-enter-your-password.-1"]';
const $emptyemail =
  '[data-autotest-id="mr-error-please-enter-your-email-address.-1"]';

describe("miro.com login", function() {
  beforeEach(() => {
    browser.url("https://miro.com/login/");
    $($email).waitForExist(5000);
  });

  it("should successfully login", () => {
    $($email).setValue(userEmail);
    $($password).setValue(userPassword);
    $($signUpButton).click();
    assert.strictEqual(browser.getUrl(), "https://miro.com/app/dashboard/");
  });
  it("should display that email is not found", () => {
    $($email).setValue("errormail@ya.ru");
    $($password).setValue(userPassword);
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
    assert.strictEqual(
      $($error).getText(),
      "The email or password you entered is incorrect.\nPlease try again."
    );
  });
  it("should display that password incorrect", () => {
    $($email).setValue(userEmail);
    $($password).setValue("incorrectPassword");
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
    assert.strictEqual(
      $($error).getText(),
      "The email or password you entered is incorrect.\nPlease try again."
    );
  });
  it("should display that password and email aren't entered", () => {
    $($email).setValue(null);
    $($password).setValue(null);
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
    assert.strictEqual(
      $($emptyemail).getText(),
      "Please enter your email address."
    );
    assert.strictEqual(
      $($emptypassword).getText(),
      "Please enter your password."
    );
  });
  it("should display that email aren't entered", () => {
    $($email).setValue(null);
    $($password).setValue(userPassword);
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
    assert.strictEqual(
      $($emptyemail).getText(),
      "Please enter your email address."
    );
  });
  it("should display that password aren't entered", () => {
    $($email).setValue(userEmail);
    $($password).setValue(null);
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
    assert.strictEqual(
      $($emptypassword).getText(),
      "Please enter your password."
    );
  });
});
