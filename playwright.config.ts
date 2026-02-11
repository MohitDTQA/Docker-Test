// import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';
// import dotenv from 'dotenv';

// dotenv.config({ path: 'config.env', quiet: true, });
// dotenv.config({ path: 'creds.env', quiet: true, });

// // 1. Define all available browser projects
// const browserProjects: Record<string, any> = {
//   chrome: {
//     name: 'Chrome', use: {
//       viewport: null,
//       launchOptions: {
//         slowMo: Number(process.env.SLOW_MOTION) || 0,
//         headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
//         args: [
//           '--start-maximized'
//         ],
//       },
//     }
//   },
//   msedge: {
//     name: 'Microsoft Edge', use: {
//       viewport: null,
//       launchOptions: {
//         slowMo: Number(process.env.SLOW_MOTION) || 0,
//         headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
//         args: [
//           '--start-maximized'
//         ],
//         channel: 'msedge'
//       },
//     }
//   },
//   firefox: { name: 'Firefox', use: { ...devices['Desktop Firefox'], } },
//   webkit: {
//     name: 'WebKit', use: {
//       ...devices['Desktop Safari'],
//       args: [
//         '--start-maximized'
//       ]
//     }
//   },
//   googlechrome: {
//     name: 'Google Chrome', use: {
//       viewport: null,
//       launchOptions: {
//         slowMo: Number(process.env.SLOW_MOTION) || 0,
//         headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
//         args: [
//           '--start-maximized',
//         ],
//         channel: 'chrome'
//       },
//     }
//   },
//   mobilechrome: { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
//   mobilesafari: { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
// };

// // 2. Helper to normalize strings (remove spaces + lowercase)
// const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();

// // 3. Read BROWSER env variable and split by comma
// const browsersEnv = process.env.BROWSER
//   ? process.env.BROWSER.split(',').map(b => normalize(b))
//   : ['chrome']; // default if nothing is set

// // 4. Select valid projects
// const selectedProjects = browsersEnv
//   .map(b => browserProjects[b])
//   .filter(Boolean); // remove invalid entries

// // 5. Fallback to Chrome if nothing valid was selected
// if (selectedProjects.length === 0) {
//   selectedProjects.push(browserProjects['chrome']);
// }

// // 6. Playwright config
// const config: PlaywrightTestConfig = defineConfig({
//   timeout: parseInt(process.env.TIMEOUT!),
//   testDir: `./${process.env.TEST_DIRECTORY}`,
//   outputDir: 'results_reports/test-results',
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.PARALLEL_TESTS ? Number(process.env.PARALLEL_TESTS) : undefined,
//   // reporter: [['html', { open: 'never' }]],
//   reporter: [
//     ['html', { open: 'never', outputFolder: 'results_reports/playwright-report' }],
//     ['allure-playwright', { resultsDir: 'results_reports/allure-results' }],
//   ],


//   use: {
//     actionTimeout: parseInt(process.env.ACTION_TIMEOUT!),
//     navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT!),
//     screenshot: 'only-on-failure',
//     trace: 'on',
//     launchOptions: {
//       slowMo: Number(process.env.SLOW_MOTION) || 0,
//       headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
//     },
//     // Video recording will be configured per-test in testbase.ts
//     video: {
//       mode: process.env.RECORD_VIDEO === 'on' ? 'on' : 'off',
//     },
//   },

//   projects: selectedProjects,
// });

// export default config;


import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env', quiet: true, });
dotenv.config({ path: 'creds.env', quiet: true, });

// 1. Define all available browser projects
const browserProjects: Record<string, any> = {
  chrome: {
    name: 'Chrome', use: {
      viewport: null,
      launchOptions: {
        slowMo: Number(process.env.SLOW_MOTION) || 0,
        headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
        args: [
          '--start-maximized',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      },
    }
  },
  msedge: {
    name: 'Microsoft Edge', use: {
      viewport: null,
      launchOptions: {
        slowMo: Number(process.env.SLOW_MOTION) || 0,
        headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
        args: [
          '--start-maximized',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        channel: 'msedge'
      },
    }
  },
  firefox: { 
    name: 'Firefox', 
    use: { 
      ...devices['Desktop Firefox'],
      launchOptions: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      },
    } 
  },
  webkit: {
    name: 'WebKit', use: {
      ...devices['Desktop Safari'],
      launchOptions: {
        args: [
          '--start-maximized',
          '--no-sandbox',
        ],
      },
    }
  },
  googlechrome: {
    name: 'Google Chrome', use: {
      viewport: null,
      launchOptions: {
        slowMo: Number(process.env.SLOW_MOTION) || 0,
        headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
        args: [
          '--start-maximized',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        channel: 'chrome'
      },
    }
  },
  mobilechrome: { 
    name: 'Mobile Chrome', 
    use: { 
      ...devices['Pixel 5'],
      launchOptions: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      },
    } 
  },
  mobilesafari: { 
    name: 'Mobile Safari', 
    use: { 
      ...devices['iPhone 12'],
      launchOptions: {
        args: [
          '--no-sandbox',
        ],
      },
    } 
  },
};

// 2. Helper to normalize strings (remove spaces + lowercase)
const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();

// 3. Read BROWSER env variable and split by comma
const browsersEnv = process.env.BROWSER
  ? process.env.BROWSER.split(',').map(b => normalize(b))
  : ['chrome']; // default if nothing is set

// 4. Select valid projects
const selectedProjects = browsersEnv
  .map(b => browserProjects[b])
  .filter(Boolean); // remove invalid entries

// 5. Fallback to Chrome if nothing valid was selected
if (selectedProjects.length === 0) {
  selectedProjects.push(browserProjects['chrome']);
}

// 6. Playwright config
const config: PlaywrightTestConfig = defineConfig({
  timeout: parseInt(process.env.TIMEOUT!),
  testDir: `./${process.env.TEST_DIRECTORY}`,
  outputDir: 'results_reports/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.PARALLEL_TESTS ? Number(process.env.PARALLEL_TESTS) : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'results_reports/playwright-report' }],
    ['allure-playwright', { resultsDir: 'results_reports/allure-results' }],
  ],

  use: {
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT!),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT!),
    screenshot: 'only-on-failure',
    trace: 'on',
    launchOptions: {
      slowMo: Number(process.env.SLOW_MOTION) || 0,
      headless: process.env.OPEN_BROWSER ? process.env.OPEN_BROWSER !== 'true' : true,
    },
    video: {
      mode: process.env.RECORD_VIDEO === 'on' ? 'on' : 'off',
    },
  },

  projects: selectedProjects,
});

export default config;