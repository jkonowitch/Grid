build:
	./node_modules/.bin/watchify -t reactify ./main.js -o ./build/app.js

.PHONY: build