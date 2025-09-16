const { test, expect } = require('@playwright/test');

test.describe('Login Page Cross-Browser Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the application
        await page.goto('http://localhost:3000');

        // Wait for the page to load
        await page.waitForLoadState('networkidle');

        // Close webpack dev server overlay if present
        try {
            await page.locator('#webpack-dev-server-client-overlay').waitFor({ timeout: 1000 });
            await page.evaluate(() => {
                const overlay = document.getElementById('webpack-dev-server-client-overlay');
                if (overlay) overlay.remove();
            });
        } catch (e) {
            // Overlay not present, continue
        }
    });

    test('should display login form elements correctly', async ({ page }) => {
        // Check if email input exists and has correct placeholder
        const emailInput = page.locator('input[type="email"]');
        await expect(emailInput).toBeVisible();
        await expect(emailInput).toHaveAttribute('placeholder', 'your@uit.edu.mm');

        // Check if password input exists and has correct placeholder
        const passwordInput = page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toHaveAttribute('placeholder', 'your little secret :D');

        // Check if continue button exists
        const continueButton = page.locator('button:has-text("continue")');
        await expect(continueButton).toBeVisible();

        // Check if "NEW ACCOUNT?" link exists
        const newAccountLink = page.locator('button:has-text("NEW ACCOUNT?")');
        await expect(newAccountLink).toBeVisible();

        // Check if login title is displayed
        const loginTitle = page.locator('h1:has-text("SIMPLIFY your CAMPUS LIFE LOGIN, EXPLORE!")');
        await expect(loginTitle).toBeVisible();
    });

    test('should show validation error for empty email', async ({ page }) => {
        // Try to submit form without filling email
        const continueButton = page.locator('button:has-text("continue")');
        await continueButton.click();

        // Check if error message is displayed - there will be two errors (email and password)
        const emailError = page.locator('.alert.alert-error:has-text("EMAIL IS REQUIRED")');
        await expect(emailError).toBeVisible();

        const passwordError = page.locator('.alert.alert-error:has-text("PASSWORD IS REQUIRED")');
        await expect(passwordError).toBeVisible();
    });

    test('should accept email input', async ({ page }) => {
        const emailInput = page.locator('input[type="email"]');

        // Type a test email
        await emailInput.fill('test@uit.edu.mm');

        // Verify the email was entered
        await expect(emailInput).toHaveValue('test@uit.edu.mm');
    });

    test('should accept password input', async ({ page }) => {
        const passwordInput = page.locator('input[type="password"]');

        // Type a test password
        await passwordInput.fill('testpassword123');

        // Verify the password was entered (value should be hidden but field should be filled)
        await expect(passwordInput).toHaveValue('testpassword123');
    });

    test('should handle complete login form submission', async ({ page }) => {
        const emailInput = page.locator('input[type="email"]');
        const passwordInput = page.locator('input[type="password"]');
        const continueButton = page.locator('button:has-text("continue")');

        // Fill in the form
        await emailInput.fill('test@uit.edu.mm');
        await passwordInput.fill('testpassword123');

        // Submit the form
        await continueButton.click();

        // Note: Since there's no actual backend, we can't test successful login
        // But we can verify the form submission attempt was made
        // You would typically check for navigation or success messages here
    });

    test('should be responsive on mobile devices', async ({ page }) => {
        // This test will automatically run on mobile viewports as configured
        const loginSection = page.locator('.loginSignup-section');
        await expect(loginSection).toBeVisible();

        const formContainer = page.locator('.form-container');
        await expect(formContainer).toBeVisible();

        // Verify form elements are still accessible on mobile
        const emailInput = page.locator('input[type="email"]');
        const passwordInput = page.locator('input[type="password"]');

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });

    test('should have proper accessibility attributes', async ({ page }) => {
        // Check if form has proper labels
        const emailLabel = page.locator('label:has-text("Email")');
        const passwordLabel = page.locator('label:has-text("Password")');

        await expect(emailLabel).toBeVisible();
        await expect(passwordLabel).toBeVisible();

        // Check if inputs are properly typed
        const emailInput = page.locator('input[type="email"]');
        const passwordInput = page.locator('input[type="password"]');

        await expect(emailInput).toHaveAttribute('type', 'email');
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should maintain focus order for keyboard navigation', async ({ page }) => {
        // Start from email input to ensure consistent starting point
        const emailInput = page.locator('input[type="email"]');
        const passwordInput = page.locator('input[type="password"]');
        const continueButton = page.locator('button:has-text("continue")');

        // Click on email input to start from known position
        await emailInput.click();
        await expect(emailInput).toBeFocused();

        // Tab to password input
        await page.keyboard.press('Tab');
        await expect(passwordInput).toBeFocused();

        // Tab to continue button
        await page.keyboard.press('Tab');
        await expect(continueButton).toBeFocused();
    });
});
