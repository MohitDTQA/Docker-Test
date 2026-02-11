#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Playwright Tests in Docker...${NC}"

# Build the Docker image
echo -e "${BLUE}Building Docker image...${NC}"
docker-compose build

# Run tests
echo -e "${BLUE}Running tests...${NC}"
docker-compose up --abort-on-container-exit --exit-code-from playwright-tests

# Check exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Tests completed successfully!${NC}"
else
    echo -e "${RED}✗ Tests failed with exit code $EXIT_CODE${NC}"
fi

# Cleanup
echo -e "${BLUE}Cleaning up...${NC}"
docker-compose down

# Show report location
echo -e "${BLUE}Reports available at:${NC}"
echo -e "  - HTML: ${GREEN}./results_reports/playwright-report/index.html${NC}"
echo -e "  - Allure: ${GREEN}./results_reports/allure-results${NC}"

exit $EXIT_CODE