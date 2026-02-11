#!/bin/bash

# Run specific test file
# Usage: ./scripts/docker-test-specific.sh Tests/login.spec.ts

if [ -z "$1" ]; then
    echo "Usage: $0 <test-file-path>"
    exit 1
fi

TEST_FILE=$1

echo "Running test: $TEST_FILE"

docker-compose run --rm playwright-tests npx playwright test "$TEST_FILE"