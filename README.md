
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install react-hook-form js-cookie react-router-dom react-countdown framer-motion @studio-freight/lenis
```

Start the server

```bash
  npm start
```

Now you are good to go.

## Playwright Testing (Step by Step)

1) Install Playwright Test and browsers

```bash
  npm install -D @playwright/test
  npx playwright install
```

2) Add basic scripts (optional but recommended)

Add the following to your `package.json` under `scripts`:

```json
  {
    "scripts": {
      "test:e2e": "playwright test",
      "test:e2e:ui": "playwright test --ui",
      "test:e2e:debug": "PWDEBUG=1 playwright test",
      "playwright:report": "playwright show-report"
    }
  }
```

3) Create test folder and a sample test
(*** skip this step, already created test cases ***)

By default, Playwright looks for tests in the `tests` directory. Create `tests/example.spec.ts` (TypeScript) or `.js` (JavaScript):

```ts
  import { test, expect } from '@playwright/test';

  test('homepage has title', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Club|React|App/i);
  });
```

4) Start your app

Ensure the app is running in another terminal:

```bash
  npm start
```
Ensure spring boot is running on port 8080 since api requests will be sent to backend.

5) Run tests

```bash
  npx playwright test           # headless run
  npx playwright test --ui      # UI mode (great for local dev)
```

6) Run a specific file/test or browser

```bash
  npx playwright test tests/example.spec.ts
  npx playwright test -g "homepage has title"
  npx playwright test --project=chromium
```

7) Record or update tests (optional)

```bash
  npx playwright codegen http://localhost:3000
```

8) View last HTML report

```bash
  npx playwright show-report
```

Notes:
- Keep e2e files in `tests/` (default) or configure `testDir` in `playwright.config.(ts|js)`.
- If you don’t have a config yet, generate one with `npx playwright install` or create `playwright.config.ts` to customize `use.baseURL`, `testDir`, and projects (Chromium, Firefox, WebKit).