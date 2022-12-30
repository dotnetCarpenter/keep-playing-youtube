# Keep Playing YouTube

This is currently just an experiment for creating my first Firefox Add-on.

## Notes

Scripts in _package.json_:

```jsonc
"scripts": {
	// https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-run
	"start": "web-ext run --source-dir ./extension/ --devtools --firefox firefoxdeveloperedition",

	// https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-lint
	"test": "web-ext lint --source-dir=\"./extension/\"",

	// info needed when crating an issue at https://github.com/mozilla/web-ext/issues
	"info": "node --version && npm --version && web-ext --version"
},
````
