// @ts-check
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
  setTimeout (f, msDelay)
  console.debug (`Will call ${f.name} in ${msDelay} ms`)
}

//    clickPlay :: () -> Void
const clickPlay = () => {
  const click = map (HtmlElement => { HtmlElement.click (); console.debug ("Clicked on", HtmlElement) })
  const buttons = document.querySelectorAll("tp-yt-paper-dialog button")

  if (size (buttons)) click (buttons)
  else console.debug ('Could not find any button to click on')
}

const msDelayBeforeQuerying = 400
const clickAfterPauseAndDelay = listenForPause (delay (clickPlay)
                                                      (msDelayBeforeQuerying))

const addPauseHandlerTo = map (clickAfterPauseAndDelay)

document.addEventListener ("load", () => {
  const videoElements = document.getElementsByTagName ("video")
  const numberOfVideoElements = size (videoElements)

  addPauseHandlerTo (videoElements)

  if (numberOfVideoElements > 0)
    console.debug (`Found ${numberOfVideoElements} video element ${numberOfVideoElements > 1 ? "s" : ""}.`)
  else
    console.debug ("Did not find any video elements. Keep Playing YouTube will do nothing.")
})
