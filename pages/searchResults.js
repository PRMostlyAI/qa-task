class SearchResults {
    constructor(page) {
        this.page = page;
    }

    async isNoResultsMessageDisplayed(term) {
        try {
            await this.page.waitForLoadState('networkidle');
            const noResultsText = await this.page.getByText('Sorry, no results for:', { exact: true }).isVisible();
            const searchTermText = await this.page.getByText(term, { exact: true }).isVisible();
            
            return noResultsText && searchTermText;
        } catch (error) {
            console.log('Error finding no results message:', error);
            return false;
        }
    }
}

module.exports = { SearchResults };
