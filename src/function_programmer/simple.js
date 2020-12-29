const Functors = require("./comm_functors")

const Maybe = Functors.Maybe

var simpleMaybe = Maybe.of("simple functor");
console.log(`simpleMaybe ${simpleMaybe}`)