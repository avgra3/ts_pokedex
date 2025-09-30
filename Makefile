help:
	@echo "Available commands:"
	@echo "- help => See available commands"
	@echo "- build => Build the app to 'dist/main.js'"
	@echo "- start => Start the app in release mode. Will run build command."
	@echo "- dev => Run app in dev mode"
	@echo "- test => Run tests"
dev:
	npm run dev
build: test
	npm run build
start: build
	npm run start
test:
	npm run test

