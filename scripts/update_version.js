#!/usr/bin/env -S node --no-warnings

import { EOL }          from "node:os"
import { writeFile }    from "node:fs"
import { resolve }      from "node:path"
import   process        from "node:process"
import { map, zipWith } from "./utils.js"

//    updateVersion :: Object -> String -> Json String
const updateVersion = pkg => version => JSON.stringify ({ ...pkg, version }, null, "\t")

//    readJsonFile :: String -> Json Object
const readJsonFile = path => import (path, { assert: { type: "json" } }).then (({default: json}) => json)

const readStdIn = f => {
    let version = ""

    process.stdin.on ("readable", () => {
        let chunk
        // Use a loop to make sure we read all currently available data
        while (null !== (chunk = process.stdin.read ())) {
            version += chunk.toString ().replace (EOL, "")
            // console.debug (`Read ${chunk.length} bytes of data...`, version.toString())
        }
    })

    process.stdin.on ("end", () => {
        // console.debug ("Call f with", version.toString())
        f (version.toString())
    })
}


/////////////// MAIN PROGRAM ///////////////
const scriptName = process.argv[1]

const files = [
    resolve (scriptName, "../../package.json"),
    resolve (scriptName, "../../extension/manifest.json")
]

//    writePackages :: [(a -> void)]
const writePackages = map (path => data => writeFile (path, data, console.error))
                          (files)

readStdIn (version => {                                 // String
    Promise.all (map (readJsonFile)                     // [Json Object]
                     (files))
          .then (map (updateVersion))                   // [(String -> Json String)]
          .then (map (getJson => getJson (version)))    // [Json String]
          .then (zipWith (write => json => write (json))
                         (writePackages))
})
