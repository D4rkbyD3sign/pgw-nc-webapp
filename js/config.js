// Project + event identity. THE file that changes year on year.
//
// To run the framework for another conference: change EVENT_ID, and every
// question, survey and draw-code writes into a fresh drawer. Last year's
// record stays intact underneath, untouched.

export const firebaseConfig = {
  apiKey: 'AIzaSyCGI2e3FUE47H1vgiasxdruFgrWNS32l9g',
  authDomain: 'pgw-nc.firebaseapp.com',
  projectId: 'pgw-nc',
  storageBucket: 'pgw-nc.firebasestorage.app',
  messagingSenderId: '165010888935',
  appId: '1:165010888935:web:b0d4777dbe00e491dd6a42',
}
// Not a secret. A Firebase web apiKey is a project *identifier* — every web app
// ships it in the browser. Security lives entirely in firestore.rules.
// Analytics deliberately omitted: this app collects nothing about who holds the phone.

/** The drawer everything for this conference lives in. Bump for 2027. */
export const EVENT_ID = 'nc-2026'

// SDK is pinned to 12.16.0 (verified present on gstatic 2026-07-27). Import
// specifiers must be literal strings, so the version is written into each
// import in brain.js — change it there, and only deliberately.
