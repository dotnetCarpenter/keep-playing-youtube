#!/usr/bin/env -S node --no-warnings

import { convertToNumber, addOne } from "./utils.js"
import pkg from "../package.json" assert { type: "json" }

const version = pkg.version.split (".")
const [major, minor, patch] = convertToNumber (version)

console.log (`${major}.${minor}.${addOne (patch)}`)
