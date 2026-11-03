package com.salesforce.login.tests;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.salesforce.login.pages.LoginPage;

import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Story;

@Epic("Salesforce Login")
@Feature("Authentication - Invalid Login")
public class InvalidLoginTest {

    private WebDriver driver;
    private LoginPage loginPage;
    private Properties config;

    @BeforeTest(alwaysRun = true)
    public void setUp() {
        try {
            config = loadConfig();
            driver = createDriver();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(Long.parseLong(config.getProperty("implicitWaitSeconds", "15"))));
            resetLoginPage();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to initialise the invalid login test environment", e);
        }
    }

    @Test(priority = 1)
    @Story("Invalid credentials")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verify a user with a wrong username and password sees the invalid credential error")
    public void verifyInvalidCredentialsShowError() {
        try {
            resetLoginPage();
            loginPage.login(config.getProperty("invalidUsername"), config.getProperty("invalidPassword"));
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message is not displayed for invalid credentials");
            Assert.assertTrue(loginPage.getErrorMessage().toLowerCase().contains("check your username and password"),
                    "Unexpected error message for invalid credentials: " + loginPage.getErrorMessage());
            Assert.assertTrue(loginPage.getCurrentUrl().contains("login.salesforce.com"),
                    "User was navigated away from the login page with invalid credentials");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Invalid credentials scenario failed", e);
        }
    }

    @Test(priority = 2)
    @Story("Empty username")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verify submitting an empty username shows the username error and does not reveal the password field")
    public void verifyEmptyUsernameShowsError() {
        try {
            resetLoginPage();
            loginPage.clickLogin();
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message is not displayed for an empty username");
            Assert.assertTrue(loginPage.getErrorMessage().toLowerCase().contains("enter your username"),
                    "Unexpected error message for an empty username: " + loginPage.getErrorMessage());
            Assert.assertFalse(loginPage.isPasswordFieldDisplayed(), "Password field should not be revealed for an empty username");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Empty username scenario failed", e);
        }
    }

    @Test(priority = 3)
    @Story("Empty password")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verify submitting a username with an empty password shows the password error")
    public void verifyEmptyPasswordShowsError() {
        try {
            resetLoginPage();
            loginPage.enterUsername(config.getProperty("invalidUsername"));
            loginPage.clickLogin();
            loginPage.clickLogin();
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message is not displayed for an empty password");
            Assert.assertTrue(loginPage.getErrorMessage().toLowerCase().contains("enter your password"),
                    "Unexpected error message for an empty password: " + loginPage.getErrorMessage());
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Empty password scenario failed", e);
        }
    }

    @Test(priority = 4)
    @Story("Empty credentials")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verify submitting both fields empty shows an error and does not navigate away")
    public void verifyEmptyCredentialsShowError() {
        try {
            resetLoginPage();
            loginPage.clickLogin();
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message is not displayed for empty credentials");
            Assert.assertFalse(loginPage.getErrorMessage().isBlank(), "Error message is empty for empty credentials");
            Assert.assertTrue(loginPage.getCurrentUrl().contains("login.salesforce.com"),
                    "User was navigated away from the login page with empty credentials");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Empty credentials scenario failed", e);
        }
    }

    @AfterTest(alwaysRun = true)
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (RuntimeException e) {
            throw new IllegalStateException("Failed to quit the WebDriver session", e);
        } finally {
            driver = null;
        }
    }

    private void resetLoginPage() {
        driver.get(config.getProperty("baseUrl"));
        loginPage = new LoginPage(driver, Long.parseLong(config.getProperty("explicitWaitSeconds", "20")));
        loginPage.waitUntilLoaded();
    }

    private WebDriver createDriver() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        options.addArguments("--remote-allow-origins=*");
        if (Boolean.parseBoolean(config.getProperty("headless", "false"))) {
            options.addArguments("--headless=new");
        }
        return new ChromeDriver(options);
    }

    private Properties loadConfig() {
        Properties properties = new Properties();
        try (InputStream input = InvalidLoginTest.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new IllegalStateException("config.properties could not be found on the classpath");
            }
            properties.load(input);
            return properties;
        } catch (IOException e) {
            throw new IllegalStateException("Failed to read config.properties", e);
        }
    }
}
