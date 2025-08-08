// // firebaseService.js

require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./keys/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

module.exports = admin; // export the full admin instance
