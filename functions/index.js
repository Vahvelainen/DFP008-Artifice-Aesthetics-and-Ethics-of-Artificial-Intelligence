/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const stabilityai = require("./stabilityai")

//Cloud Function location
const europeWest = functions.region("europe-west1")
const europeWestHttps = europeWest.https;

//Image generation is callable
exports.img2img = europeWestHttps.onCall( async (data, context) => {
  return await stabilityai.img2imgAPI(data.promt, data.negative_promt, data.image)
});

//Get enginens
exports.getEngines = europeWestHttps.onCall( async (data, context) => {
  return await stabilityai.getEngines()
});