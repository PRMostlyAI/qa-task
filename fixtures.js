const base = require('@playwright/test');
const { Homepage } = require('./pages/homepage');
const { ContactPage } = require('./pages/contactPage');
const { SearchResults } = require('./pages/searchResults');

const test = base.test.extend({
    homePage: async ({ page }, use) => {
        const homePage = new Homepage(page);
        await use(homePage);
    },
    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        await use(contactPage);
    },
    searchResults: async ({ page }, use) => {
        const searchResults = new SearchResults(page);
        await use(searchResults);
    }
});

module.exports = test; 