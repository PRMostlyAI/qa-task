# Test automation framework challenge
This repository contains a solution to the challenge sent over the email.

1. **Navigation Check**  
   - Verifies that specific bookmarks (links) are visible on the homepage.
2. **Search Check**  
   - Searches for an intentionally misspelled term ("sythetic") and verifies that the "no results" message is displayed.
3. **Contact Form Check**  
   - Opens the Contact page, fills out the form fields, checks the consent box, and hovers over the "Send Message" button.

## Project Structure

```
.
├── pages/
│   ├── homepage.js        # Homepage elements and actions
│   ├── contactPage.js         # Contact page elements and actions
│   └── searchResults.js  # Search results page elements and checks
├── tests/
│   ├── homepage.test.js    # Homepage navigation tests
│   ├── search.test.js      # Search functionality tests
│   └── contactForm.test.js # Contact form tests
├── fixtures.js            # Page object fixtures for tests
├── playwright.config.js   # Playwright configuration
└── README.md             # This file
```

## Prerequisites

- **Node.js** (16.x or higher) and **npm**
- **Git** (to clone the repo)
- **Allure command-line tool** (for reporting)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PRMostlyAI/qa-task.git
   ```

2. **Install dependencies**:
   ```bash
   cd qa-task
   npm install
   ```

3. **Install Allure command-line tool**:
   ```bash
   npm install -g allure-commandline
   ```

## Running the Tests

### Basic Test Execution
```bash
npx playwright test
```

### Running in Headed Mode
```bash
npx playwright test --headed
```

### Running Specific Test File
```bash
npx playwright test tests/homepage.test.js
```

## Viewing Test Reports

### HTML Report (Playwright's built-in)
```bash
npx playwright show-report
```

### Allure Report
```bash
# Generate and serve the report (preferred method)
allure serve ./allure-results

# Or generate static report
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report
```

### Example reports
A sample report that was successfully ran is available in the repository under the test_results_sample.zip file.

## Test Architecture

### Page Objects
The test suite uses the Page Object Model (POM) pattern to encapsulate page-specific elements and actions:
- `Homepage`: Navigation menu, search functionality, and contact page navigation
- `ContactPage`: Contact form fields and interactions
- `SearchResults`: Search results page

### Fixtures
We use Playwright fixtures to manage page object instantiation and provide them to tests:
```javascript
const test = base.test.extend({
    homePage: async ({ page }, use) => {
        const homePage = new Homepage(page);
        await use(homePage);
    },
    // ... other fixtures
});
```

This allows for cleaner test code:
```javascript
test('Verify navigation menu items are visible', async ({ homePage }) => {
    await homePage.visit();
    const navItems = await homePage.isNavigationVisible();
    expect(navItems.every(isVisible => isVisible)).toBeTruthy();
});
```

## Known issues / limitations

### Locator names
The approach I have taken is to utilize the locator IDs instead of captions to ensure, in case the button name is simply changed or a new language is introduced, that the checked item does not change. 
The drawback here is the locator names are not really reflecting what they are about (eg."#-mega-dropdown-3995-16"). Would be best if the locators would include the name of the item that is being located (even if it's just #-mega-dropdown-3995-16-pricing).

### Cookie popup clearing the contact form / consent checkbox state
While the task outright asked to perform the tests in a specific order, I had to make a choice on how to handle an issue that I encountered around the cookie popup: when it becomes visible, it clears the form.
The approach taken was to swap the order of the form fill out and the consent checkbox click - allowing the popup to show up before the form is being actually filled out.
Another ways to handle it:
- Fill the form twice (once before the popup shows up, once after).
- Find a way to trigger the popup: In non-simulated environment. it only shows up when the mouse cursor is moved onto the website. Seems like Playwright methods DO NOT trigger it, and thus an action (ie. the said checkbox selection) needs to be done. If a way could be found to trigger the popup, then a method could be added to handle the popup, and the order of the actions could be swapped back.
- Fix it on the webiste itself

### Fields on the contact formstill showing errors after filling it out
I have noticed that after finishing the test, despite the form being properly filled out, the message field would still show an eror that it needs to be filled out.

### Broken screenshots / videos
Some of the proof screenshots/videos show a big chunk of white page, likely due to the "reCAPTCHA" widget. This is not a bug but more something to consider handling better.

### Handling of the Consent checkbox
The checkbox itself would not react to the .check() method, so I used a fallback to clicking on it instead to complete the task. 


## Next steps

Below is a list of possible next actions to expand on the framework to further increase coverage and the value from running the tests.

### 1. Set it up as part of CI/CD
Can run after each new build to ensure nothing broke on the page.

### 2. Responsiveness testing / additional browsers support
- Define viewport sizes for all key breakpoints in Playwright test configurations:
  - Desktop (> 992px)
  - Tablet (768px - 992px)
  - Mobile (< 768px)
- Create separate test suites for mobile-specific functionality (eg. no search button or hamburger menu showing up on specific breakpoint, which fails all the respective tests)
- Add webkit / firefox, consider if using solution like brwoserstack would provide any additional value

eg. how searchu button disappearing on mobile could be handled

```javascript
   const viewportSize = page.viewportSize();
    test.skip(viewportSize.width <= 768, 'Search is not available on mobile views');
```

### 3. Test case mnagement system
Consider integrating with Qase.io for structured test case management, test run history, tracking and stakeholder-friendly dashboards. Can be further extended to track requirements etc.

### 4. Building a helper file
A helper file that could drive ie. form data could be set up, or to control the Cookie popup that can show up on any page.

## Troubleshooting

- For browser launch issues: `npx playwright install`
- Adjust timeouts in `playwright.config.js` for slower connections
