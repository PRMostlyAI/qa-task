const { expect } = require('@playwright/test');
const test = require('../fixtures');

test('Verify navigation menu items are visible', async ({ homePage }) => {
    await homePage.visit();
    const navItems = await homePage.isNavigationVisible();
    expect(navItems.every(isVisible => isVisible)).toBeTruthy();
}); 