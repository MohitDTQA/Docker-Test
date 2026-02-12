FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# Allure CLI requires a Java runtime.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-21-jre-headless \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# CI mode keeps Playwright behavior consistent in container runs.
ENV CI=true

CMD ["npx", "playwright", "test"]
