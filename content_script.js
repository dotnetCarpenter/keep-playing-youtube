"use strict"

const Just = x => ({
  map (f) { return Just (f (x)) },
  chain (f) { return f (x) },
  join (Maybe) { return Maybe.chain (x => x) }
})

const Nothing = () => ({
  map () { return this },
  chain () { return this },
  join (Maybe) { return Maybe.chain (x => x) }
})

const Maybe = x => x == null ? Nothing () : Just (x)

const compose = f => g => x => f (g (x))

const map = f => Functor => Functor.map
    ? Functor.map (f)
    : Array.prototype.map.call (Functor, f)

const pipe = (...Foldable) => x => Foldable.reduce ((value, f) => f (value), x)

const K = x => () => x

//    getElement :: String -> Maybe HtmlElement
const getElement = compose (Maybe)
                           (document.querySelector.bind (document))

//    getAllElements :: String -> Array Maybe HtmlElement
const getAllElements = compose (map (Maybe))
                               (document.querySelectorAll.bind (document))

//    button :: Maybe HtmlElement
const button = getElement ("tp-yt-paper-dialog #button")

//    clickYes :: HtmlElement -> Boolean
const clickYes = button => button.dispatchEvent (new MouseEvent("click"))

//    on :: String -> Function -> HtmlElement -> Void
const on = eventName => f => HtmlElement => (
    HtmlElement.addEventListener (eventName, f)
)

//    get :: String -> Object -> Maybe a
const get = key => object => Maybe (object[key])

//    keepPlaying ::
const keepPlaying = on ("pause")
                       (pipe (
                           K (button),      // Maybe HtmlElement
                           map (clickYes),  // Maybe Boolean
                       ))


// MAIN
map (map (keepPlaying))
    (getAllElements ("video"))

// modern way
// button.dispatchEvent (new PointerEvent ("pointerenter"))
// button.dispatchEvent (new PointerEvent ("pointerdown"))
