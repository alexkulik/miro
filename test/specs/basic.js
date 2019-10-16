const assert = require("assert");
const userPassword = process.env.PASSWORD;
const userEmail = "alexanderkulikov94@gmail.com";
const $email = '[data-autotest-id="mr-form-login-email-1"]';
const $password = '[data-autotest-id="mr-form-login-password-1"]';
const $signUpButton = ".signup__submit";
const $error = ".signup__error-item";

describe("miro.com login", () => {
  it("should successfully login", () => {
    browser.url("https://miro.com/login/");
    $($email).waitForExist(5000);
    $($email).setValue(userEmail);
    $($password).setValue(userPassword);
    $($signUpButton).click();
    assert.strictEqual(browser.getUrl(), "https://miro.com/app/dashboard/");
  });
  it("should display that email is not found", () => {
    browser.url("https://miro.com/login/");
    $($email).waitForExist(5000);
    $($email).setValue("mistake@ya.ru");
    $($password).setValue(userPassword);
    $($signUpButton).click();
    assert.ok($($error).isDisplayed());
    assert.strictEqual(browser.getUrl(), "https://miro.com/login/");
  });
  it("should display that password incorrect", () => {
    browser.url("https://miro.com/login/");
    $($email).waitForExist(5000);
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
});
