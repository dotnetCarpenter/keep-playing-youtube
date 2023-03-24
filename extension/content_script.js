"use strict"

//    map :: (a -> b) -> [a] -> [b]
const map = f => elements => {
  const copy = []

  for (let element of elements) {
    copy.push (f (element))
  }

  return copy
}

//    size :: [Any] -> Int
const size = elements => (
  elements.length
    ? elements.length
    : 0
)

//    listenForPause :: (a -> b) -> HtmlElement -> HtmlElement
const listenForPause = f => HtmlElement => {
  HtmlElement.addEventListener ("pause", f, true)
  console.debug ("HtmlElement", HtmlElement)
  return HtmlElement
}

//    delay :: (a -> Vpod) -> Number -> () -> Void
const delay = f => msDelay => () => {
  window.setTimeout (f, msDelay)
  console.debug (`Will call ${f.name} in ${msDelay} ms`)
}

const click = map (HtmlElement => { HtmlElement.click (); console.debug ("Clicked on", HtmlElement) })

//    clickPlay :: () -> Void
const clickPlay = () => {
  const buttons = document.querySelectorAll (
    "tp-yt-paper-dialog button, tp-yt-paper-toast yt-touch-feedback-shape .yt-spec-touch-feedback-shape")

  if (size (buttons)) click (buttons)
  else console.debug ('Could not find any button to click on')
}

const msDelayBeforeQuerying = 400
const clickAfterPauseAndDelay = listenForPause (delay (clickPlay)
                                                      (msDelayBeforeQuerying))

const addPauseHandlerTo = map (clickAfterPauseAndDelay)

const main = () => {
  const videoElements = document.getElementsByTagName ("video")
  const numberOfVideoElements = size (videoElements)

  addPauseHandlerTo (videoElements)

  if (numberOfVideoElements > 0) {
    const message = `Found ${numberOfVideoElements} video element ${numberOfVideoElements > 1 ? "s" : ""}.`
    console.debug (message)
    browser.runtime.sendMessage ({code: 0, message})
  } else {
    const message = "Did not find any video elements. Keep Playing YouTube will do nothing."
    window.addEventListener ("load", function () {
      main ()
      console.debug ("began on load")
      window.removeEventListener ("load", this)
    })
    console.debug (message)
    browser.runtime.sendMessage ({code: 1, message})  }
}

// detect ready state
if (document.readyState === "complete") {
  // Handle it asynchronously to allow scripts the opportunity to delay ready
  window.setTimeout (main, 0)
} else {
  // Use DOMContentLoaded event callback
  document.addEventListener ("DOMContentLoaded", removeReadyListeners, false)
  // A fallback to window.onload, that will always work
  window.addEventListener("load", removeReadyListeners, false )
}

function removeReadyListeners () {
  // remove listeners
  document.removeEventListener ("DOMContentLoaded", removeReadyListeners, false)
  window.removeEventListener ("load", removeReadyListeners, false)

  main ()
}
