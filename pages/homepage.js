class Homepage {
    constructor(page) {
        this.page = page;
        this.platformLink = page.locator('#-mega-dropdown-3763-16');
        this.useCasesLink = page.locator('#-mega-dropdown-3890-16');
        this.resourcesLink = page.locator('#-mega-dropdown-3926-16');
        this.companyLink = page.locator('#-mega-dropdown-3962-16');
        this.pricingLink = page.locator('#-mega-dropdown-3995-16');
        this.searchButton = page.locator('.oxy-header-search_open-icon');
        this.searchInput = page.locator('input[type="search"]');
        this.contactLink = page.locator('#text_block-4039-16');
    }

    async visit() {
        await this.page.goto('https://mostly.ai/');
    }

    async navigateToContact() {
        await this.contactLink.click();
    }

    async isNavigationVisible() {
        return await Promise.all([
            this.platformLink.isVisible(),
            this.useCasesLink.isVisible(),
            this.resourcesLink.isVisible(),
            this.companyLink.isVisible(),
            this.pricingLink.isVisible()
        ]);
    }

    async searchForTerm(term) {
        await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.searchButton.click();
        await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
    }
}

module.exports = { Homepage };
