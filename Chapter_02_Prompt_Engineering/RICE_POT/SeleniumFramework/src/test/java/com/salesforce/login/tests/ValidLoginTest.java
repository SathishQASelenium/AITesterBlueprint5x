package com.salesforce.login.tests;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.SkipException;
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
@Feature("Authentication - Valid Login")
public class ValidLoginTest {

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
            throw new IllegalStateException("Failed to initialise the valid login test environment", e);
        }
    }

    @Test(priority = 1)
    @Story("Login page UI elements")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verify the login page renders the username field, Login button and Remember Me checkbox")
    public void verifyLoginPageElementsAreDisplayed() {
        try {
            resetLoginPage();
            Assert.assertTrue(loginPage.isUsernameFieldDisplayed(), "Username field is not displayed");
            Assert.assertTrue(loginPage.isLoginButtonDisplayed(), "Login button is not displayed");
            Assert.assertTrue(loginPage.isRememberMeDisplayed(), "Remember Me checkbox is not displayed");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Login page element verification failed", e);
        }
    }

    @Test(priority = 2)
    @Story("Remember Me functionality")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verify the Remember Me checkbox can be checked and unchecked")
    public void verifyRememberMeCheckboxFunctionality() {
        try {
            resetLoginPage();
            loginPage.setRememberMe(true);
            Assert.assertTrue(loginPage.isRememberMeSelected(), "Remember Me checkbox did not get selected");
            loginPage.setRememberMe(false);
            Assert.assertFalse(loginPage.isRememberMeSelected(), "Remember Me checkbox did not get cleared");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Remember Me checkbox verification failed", e);
        }
    }

    @Test(priority = 3)
    @Story("Two-step login flow")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verify the password field is revealed after entering the username and clicking Login")
    public void verifyPasswordFieldIsRevealedAfterUsername() {
        try {
            resetLoginPage();
            Assert.assertFalse(loginPage.isPasswordFieldDisplayed(), "Password field should not be shown before the username step");
            loginPage.enterUsername("invalid.user@salesforce.test");
            loginPage.clickLogin();
            Assert.assertTrue(loginPage.isPasswordFieldDisplayed(), "Password field was not revealed after the username step");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Password reveal verification failed", e);
        }
    }

    @Test(priority = 4)
    @Story("Valid credentials login")
    @Severity(SeverityLevel.BLOCKER)
    @Description("Verify a user with valid credentials lands on the authenticated home page")
    public void verifyValidLoginRedirectsToHome() {
        String username = config.getProperty("validUsername", "").trim();
        String password = config.getProperty("validPassword", "").trim();
        if (username.isEmpty() || password.isEmpty()) {
            throw new SkipException("Valid credentials are not configured in config.properties");
        }
        try {
            resetLoginPage();
            loginPage.login(username, password);
            new WebDriverWait(driver, Duration.ofSeconds(Long.parseLong(config.getProperty("explicitWaitSeconds", "20"))))
                    .until(ExpectedConditions.not(ExpectedConditions.urlContains("login.salesforce.com")));
            Assert.assertFalse(loginPage.getCurrentUrl().contains("login.salesforce.com"),
                    "Valid credentials did not redirect away from the login page");
        } catch (AssertionError | RuntimeException e) {
            throw new AssertionError("Valid login verification failed", e);
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
        try (InputStream input = ValidLoginTest.class.getClassLoader().getResourceAsStream("config.properties")) {
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
