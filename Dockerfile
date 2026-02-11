# Use official Playwright image with all browsers
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# Set working directory
WORKDIR /app

# Install dependencies for all browsers
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Install Playwright browsers (Chrome, Edge, Firefox, WebKit)
RUN npx playwright install chromium firefox webkit
RUN npx playwright install chrome msedge

# Copy project structure
COPY Pages/ ./Pages/
COPY Tests/ ./Tests/
COPY API/ ./API/
COPY src/ ./src/
COPY test-data/ ./test-data/
COPY BasePage.ts ./BasePage.ts
COPY index.ts ./index.ts
COPY tsconfig.json ./tsconfig.json

# Copy configuration files
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY config.env ./
COPY creds.env ./

RUN mkdir -p results_reports/test-results \
             results_reports/playwright-report \
             results_reports/allure-results \
             artifacts \
             traces \
             screenshots \
             videos

RUN chmod -R 777 results_reports screenshots videos traces


# Set environment variable to disable browser sandbox (required for Docker)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Default command
CMD ["npx", "playwright", "test"]
