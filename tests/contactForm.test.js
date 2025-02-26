const { expect } = require('@playwright/test');
const test = require('../fixtures');

test('Fill and validate the contact form', async ({ homePage, contactPage }) => {
    await homePage.visit();
    await homePage.navigateToContact();

    const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        organization: 'Example Inc.',
        country: 'USA',
        heardAbout: 'LinkedIn',
        message: 'I am interested in learning more about your services.'
    };
    
    await contactPage.agreeToConsent();
    await contactPage.fillContactForm(formData);
    await contactPage.hoverOverSubmitButton();

}); 