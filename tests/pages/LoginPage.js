class LoginPage {
    constructor(page) {
        this.page = page;

        // Selectors based on actual login component
        this.emailInput = page.locator('input[type="email"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.continueButton = page.locator('button:has-text("continue")');
        this.newAccountLink = page.locator('button:has-text("NEW ACCOUNT?")');
        this.loginTitle = page.locator('h1:has-text("SIMPLIFY your CAMPUS LIFE LOGIN, EXPLORE!")');
        this.errorAlert = page.locator('.alert.alert-error');
        this.errorMessage = page.locator('.alert.alert-error span');
        this.loginSection = page.locator('.loginSignup-section');
        this.formContainer = page.locator('.form-container');
        this.emailLabel = page.locator('label:has-text("Email")');
        this.passwordLabel = page.locator('label:has-text("Password")');
        this.form = page.locator('form');
    }

    async goto() {
        await this.page.goto('http://localhost:3000');
        await this.page.waitForLoadState('networkidle');
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickNewAccount() {
        await this.newAccountLink.click();
    }

    async fillLoginForm(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
    }

    async login(email, password) {
        await this.fillLoginForm(email, password);
        await this.clickContinue();
    }

    async isLoginFormVisible() {
        return await this.emailInput.isVisible() &&
            await this.passwordInput.isVisible() &&
            await this.continueButton.isVisible();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { LoginPage };
