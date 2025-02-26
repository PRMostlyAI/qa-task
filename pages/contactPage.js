const { expect } = require('@playwright/test');


class ContactPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('input[name="your-firstname"]');
        this.lastName = page.locator('input[name="your-lastname"]');
        this.email = page.locator('input[name="your-email"]');
        this.organization = page.locator('input[name="your-organization"]');
        this.country = page.locator('input[name="your-country"]');
        this.heardAbout = page.locator('input[name="heard-about-mostly-ai"]');
        this.message = page.locator('textarea[name="your-message"]');
        this.consentCheckbox = page.locator('.wpcf7-form-control-wrap[data-name="checkbox-54"] input[type="checkbox"]');
        this.submitButton = page.locator('input.wpcf7-submit[value="SEND MESSAGE"]');
        this.cookieConsentBar = page.locator('.cky-consent-bar');
        this.formContainer = page.locator('.wpcf7-form');
    }


    async fillContactForm(data) {
        await this.firstName.waitFor({ state: 'visible' });
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.organization.fill(data.organization);
        await this.country.fill(data.country);
        await this.heardAbout.fill(data.heardAbout);
        await this.message.fill(data.message);
    }

    async agreeToConsent() {
        await this.consentCheckbox.click();
        await expect(this.consentCheckbox).toBeChecked(); // to ensure that it's actually checked
    }

    async hoverOverSubmitButton() {
        await this.submitButton.hover();
    }

}

module.exports = { ContactPage };
