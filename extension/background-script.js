"use strict"

browser.runtime.onMessage.addListener (notify)

function notify (struct) {
	console.debug ({
	  "type": "basic",
	//   "iconUrl": browser.extension.getURL ("icons/icon-white.svg"),
	  "title": "Keep Playing YouTube",
	  "message": struct.message
	});
  }