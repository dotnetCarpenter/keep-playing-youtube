// @ts-check
"use strict"

const JustSymbol = Symbol.for ("Just")
const NothingSymbol = Symbol.for ("Nothing")
const MaybeSymbol = Symbol.for ("Maybe")

const Just = x => ({
  map (f) { return Just (f (x)) },
  of (x) { return Just (x) },
  // chain (f) { return this.of (this.map (f)) },
  // join (Maybe) { return Maybe.chain (x => x) },
  [MaybeSymbol]: JustSymbol,
})

const Nothing = () => ({
  map () { return this },
  // chain () { return this },
  // join (Maybe) { return Maybe.chain (x => x) },
  [MaybeSymbol]: NothingSymbol,

})

const Maybe = x => x == null ? Nothing () : Just (x)

//    get :: String -> Object -> Maybe a
const get = key => object => Maybe (object[key])

const compose = f => g => x => f (g (x))

const map = f => Functor => Functor.map
    ? Functor.map (f)
    : Array.prototype.map.call (Functor, f)

const pipe = (...Foldable) => x => Foldable.reduce ((value, f) => f (value), x)

const K = x => () => x

const flip = f => a => b => f (b) (a)

const trace = msg => x => (console.debug (msg, x), x)

const querySelector = document.querySelector.bind (document)
const querySelectorAll = document.querySelectorAll.bind (document)

//    getElement :: String -> Maybe HtmlElement
const getElement = compose (Maybe)
                           (querySelector)

//    getAllElements :: String -> Array Maybe HtmlElement
const getAllElements = compose (map (Maybe))
                               (querySelectorAll)

//    clickYes :: HtmlElement -> Boolean
const clickYes = button => button.dispatchEvent (new MouseEvent("click"))

//    on :: String -> Function -> HtmlElement -> Void
const on = eventName => f => HtmlElement => {
  console.debug ("on", eventName, HtmlElement, f)
  return HtmlElement.addEventListener (eventName, f)
}

//    keepPlaying ::
const keepPlaying = on ("pause")
                       (pipe (
                          trace ("we detected that the youtube video stopped"),
                          getElement ("tp-yt-paper-dialog #button"), // Maybe HtmlElement
                          trace ("did we find the button?"),
                          map (clickYes),  // Maybe Boolean
                          trace ("Clicked yes"),
                       ))

// MAIN
map (map (keepPlaying))
    (getAllElements ("video"));

console.log ('reloaded')

//    main :: Array (Maybe HtmlElement) ->
// const main = pipe (
//   map (map (on) (eventNames)), // Array (Function -> Void)
//   trace ("after map map")      //
// )

// main (getAllElements ("video"))
// const eventNames = [
//   "canplaythrough",
//   "complete",
//   "durationchange",
//   "emptied",
//   "ended",
//   "loadeddata",
//   "loadedmetadata",
//   "pause",
//   "play",
//   "playing",
//   "progress",
//   "ratechange",
//   "seeked",
//   "seeking",
//   "stalled",
//   "suspend",
//   // "timeupdate",
//   "volumechange",
//   "waiting",
// ]

// const allEvents = map (on) (eventNames)

// console.debug (map (map (trace ("videos"))) (getAllElements ("video")) )
// console.debug (allEvents)
// //console.debug (map (map (trace ("videos"))) (getAllElements ("video")) )

// var A = pipe (
//   map (flip (map (on) (eventNames))),
//   trace ('after map map on')
// )

// A (allEvents)



// // modern way
// // button.dispatchEvent (new PointerEvent ("pointerenter"))
// // button.dispatchEvent (new PointerEvent ("pointerdown"))


// document.querySelectorAll ('video')
//         .forEach (video => {
//           eventNames.forEach (eventName => {
//             video.addEventListener (eventName, event => {
//               console.debug (eventName);

//               if (event.target.paused) {
//                 console.debug (Date.now ());
//               }
//             })
//           })
//         });