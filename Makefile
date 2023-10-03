install:
	npm ci

test:
	npm test

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npm run lint
