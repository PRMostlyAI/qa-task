const { expect } = require('@playwright/test');
const test = require('../fixtures');

test('Search for non-existent term returns no results', async ({ page, homePage, searchResults }) => {

    await homePage.visit();
    await homePage.searchForTerm('sythetic');
    await expect(searchResults.isNoResultsMessageDisplayed('sythetic')).resolves.toBe(true);
}); 