build:
	./node_modules/.bin/watchify -t reactify -g uglifyify ./main.js -o ./build/app.js

.PHONY: build