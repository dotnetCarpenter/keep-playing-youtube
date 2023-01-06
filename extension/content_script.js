// @ts-check
"use strict"

const attachHandler = f => HtmlElement => {
  HtmlElement.addEventListener ("pause", f)
}

const videoElements = document.querySelectorAll ("video")

const clickPlay = () => {
  let button = document.querySelector ("tp-yt-paper-dialog #button")
  if (button) {
    button.dispatchEvent (new MouseEvent("click"))
    console.debug ('Button found and MouseEvent send')
  } else {
    console.debug ('Could not find button to click on')
  }
}

const waitBeforeQuerying = 1000

Array.prototype.forEach.call (
  videoElements,
  attachHandler (setTimeout (clickPlay, waitBeforeQuerying)))

console.debug ('reloaded')
