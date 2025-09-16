/**
 * Utility functions for Playwright tests
 */

class TestUtils {
  /**
   * Wait for the application to be fully loaded
   * @param {Page} page - Playwright page object
   */
  static async waitForAppLoad(page) {
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('body', { state: 'visible' });
  }

  /**
   * Take a screenshot with a descriptive name
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @param {string} browserName - Browser being tested
   */
  static async takeScreenshot(page, name, browserName) {
    await page.screenshot({ 
      path: `screenshots/${name}-${browserName}.png`,
      fullPage: true 
    });
  }

  /**
   * Generate test data for login forms
   * @param {string} type - Type of test data needed
   * @returns {Object} Test data object
   */
  static generateTestData(type = 'valid') {
    const testData = {
      valid: {
        email: 'test@uit.edu.mm',
        password: 'ValidPassword123!'
      },
      invalid: {
        email: 'invalid-email',
        password: '123'
      },
      empty: {
        email: '',
        password: ''
      },
      special: {
        email: 'test+special@uit.edu.mm',
        password: 'Special!@#$%^&*()Password123'
      }
    };

    return testData[type] || testData.valid;
  }

  /**
   * Check if element is within viewport
   * @param {Locator} element - Playwright locator
   * @returns {boolean} True if element is in viewport
   */
  static async isElementInViewport(element) {
    return await element.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    });
  }

  /**
   * Get element's computed style property
   * @param {Locator} element - Playwright locator
   * @param {string} property - CSS property name
   * @returns {string} Property value
   */
  static async getComputedStyle(element, property) {
    return await element.evaluate((el, prop) => {
      return window.getComputedStyle(el)[prop];
    }, property);
  }

  /**
   * Simulate slow network conditions
   * @param {Page} page - Playwright page object
   */
  static async simulateSlowNetwork(page) {
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });
  }

  /**
   * Clear all form inputs on the page
   * @param {Page} page - Playwright page object
   */
  static async clearAllInputs(page) {
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
    });
  }

  /**
   * Check accessibility violations (basic check)
   * @param {Page} page - Playwright page object
   * @returns {Array} Array of accessibility issues
   */
  static async checkBasicAccessibility(page) {
    const issues = [];
    
    // Check for missing alt attributes on images
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`Found ${imagesWithoutAlt} images without alt attributes`);
    }
    
    // Check for form inputs without labels
    const inputsWithoutLabels = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      let count = 0;
      inputs.forEach(input => {
        const hasLabel = document.querySelector(`label[for="${input.id}"]`) || 
                        input.closest('label');
        if (!hasLabel) count++;
      });
      return count;
    });
    
    if (inputsWithoutLabels > 0) {
      issues.push(`Found ${inputsWithoutLabels} inputs without proper labels`);
    }
    
    return issues;
  }
}

module.exports = { TestUtils };
