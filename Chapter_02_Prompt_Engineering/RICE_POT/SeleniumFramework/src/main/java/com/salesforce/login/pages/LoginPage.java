package com.salesforce.login.pages;

import java.time.Duration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.qameta.allure.Step;

public class LoginPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement usernameField;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement passwordField;

    @FindBy(xpath = "//input[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@id='rememberUn']")
    private WebElement rememberMeCheckbox;

    @FindBy(xpath = "//label[@for='rememberUn']")
    private WebElement rememberMeLabel;

    @FindBy(xpath = "//div[@id='error']")
    private WebElement errorMessage;

    @FindBy(xpath = "//a[contains(@class,'gid-username-link')]")
    private WebElement loginWithUsernameLink;

    public LoginPage(WebDriver driver, long explicitWaitSeconds) {
        if (driver == null) {
            throw new IllegalArgumentException("WebDriver instance must not be null");
        }
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(explicitWaitSeconds));
        PageFactory.initElements(driver, this);
    }

    @Step("Wait until the login page is ready")
    public LoginPage waitUntilLoaded() {
        try {
            wait.until(d -> {
                if (isCurrentlyDisplayed(usernameField)) {
                    return true;
                }
                if (isCurrentlyDisplayed(loginWithUsernameLink)) {
                    loginWithUsernameLink.click();
                }
                return false;
            });
            return this;
        } catch (WebDriverException e) {
            throw new IllegalStateException("Login page did not become ready in time", e);
        }
    }

    private boolean isCurrentlyDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (WebDriverException e) {
            return false;
        }
    }

    @Step("Enter username: {0}")
    public LoginPage enterUsername(String username) {
        try {
            wait.until(ExpectedConditions.visibilityOf(usernameField)).clear();
            usernameField.sendKeys(username);
            return this;
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to enter the username", e);
        }
    }

    @Step("Click the Login button")
    public LoginPage clickLogin() {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
            return this;
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to click the Login button", e);
        }
    }

    @Step("Enter password")
    public LoginPage enterPassword(String password) {
        try {
            wait.until(ExpectedConditions.visibilityOf(passwordField)).clear();
            passwordField.sendKeys(password);
            return this;
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to enter the password", e);
        }
    }

    @Step("Perform the two-step login for username: {0}")
    public LoginPage login(String username, String password) {
        enterUsername(username);
        clickLogin();
        enterPassword(password);
        clickLogin();
        return this;
    }

    @Step("Set Remember Me to: {0}")
    public LoginPage setRememberMe(boolean state) {
        try {
            WebElement checkbox = wait.until(ExpectedConditions.visibilityOf(rememberMeCheckbox));
            if (checkbox.isSelected() != state) {
                wait.until(ExpectedConditions.elementToBeClickable(rememberMeCheckbox)).click();
            }
            return this;
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to set the Remember Me checkbox", e);
        }
    }

    @Step("Read the Remember Me state")
    public boolean isRememberMeSelected() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(rememberMeCheckbox)).isSelected();
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to read the Remember Me checkbox state", e);
        }
    }

    @Step("Read the login error message")
    public String getErrorMessage() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(errorMessage)).getText().trim();
        } catch (WebDriverException e) {
            throw new IllegalStateException("Login error message was not displayed", e);
        }
    }

    @Step("Check whether the login error message is displayed")
    public boolean isErrorDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(errorMessage));
            return errorMessage.isDisplayed();
        } catch (WebDriverException e) {
            return false;
        }
    }

    @Step("Check whether the username field is displayed")
    public boolean isUsernameFieldDisplayed() {
        return isDisplayed(usernameField);
    }

    @Step("Check whether the password field is displayed")
    public boolean isPasswordFieldDisplayed() {
        return isDisplayed(passwordField);
    }

    @Step("Check whether the Login button is displayed")
    public boolean isLoginButtonDisplayed() {
        return isDisplayed(loginButton);
    }

    @Step("Check whether the Remember Me checkbox is displayed")
    public boolean isRememberMeDisplayed() {
        return isDisplayed(rememberMeCheckbox);
    }

    private boolean isDisplayed(WebElement element) {
        try {
            return wait.until(ExpectedConditions.visibilityOf(element)).isDisplayed();
        } catch (WebDriverException e) {
            return false;
        }
    }

    public String getCurrentUrl() {
        try {
            return driver.getCurrentUrl();
        } catch (WebDriverException e) {
            throw new IllegalStateException("Unable to read the current URL", e);
        }
    }
}
