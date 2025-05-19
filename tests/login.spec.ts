import { test, expect, Locator } from '@playwright/test';

const username = 'testuser';
const password = 'testpassword';
const wrongusername = 'wronguser';
const wrongpassword = 'wrongpassword';
const baseURL = 'http://localhost:4200';
const loginURL = `${baseURL}/login`;
let usernameInput:Locator;
let passwordInput:Locator;
let loginButton:Locator;
let errorMessageUserName:Locator;
let errorMessagePassword:Locator;
let errorMessage:Locator;

test.beforeEach(async ({ page }) => {
  // Go to the login page
    await page.goto(loginURL);
    // Check if the username input is visible
    usernameInput = page.locator('input[name="name"]');
    await expect(usernameInput).toBeVisible();
    // Check if the password input is visible
    passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    // Check if the login button is visible
    loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
});

test('Check if the login page works without any fields filled in', async ({ page }) => {
  
  await loginButton.click();
  // Check if the error message is visible
  errorMessageUserName = page.locator('text=Username is required');
  await expect(errorMessageUserName).toBeVisible();
  errorMessagePassword = page.locator('text=Password is required');
  await expect(errorMessagePassword).toBeVisible();
});

test('Check if the login page works with only username filled in', async ({ page }) => {
  await usernameInput.fill('testuser');
  await loginButton.click();
  // Check if the error message is visible
  errorMessagePassword = page.locator('text=Password is required');
  await expect(errorMessagePassword).toBeVisible();
});

test('Check if the login page works with only password filled in', async ({ page }) => {
  await passwordInput.fill('testpassword');
  await loginButton.click();
  // Check if the error message is visible
  errorMessageUserName = page.locator('text=Username is required');
  await expect(errorMessageUserName).toBeVisible();
});

test('Check if the login page works with both fields filled in', async ({ page }) => {
  await usernameInput.fill(username);
  await passwordInput.fill(password);
  await loginButton.click();
  // Check if the error message is visible
  errorMessage = page.locator('Invalid Username or Password');
  await expect(errorMessageUserName).toBeVisible();
});