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

/** THE VERSION BEACON — update discipline point 2, SCOPE.md.
 *
 *  This is the build number baked into whatever code the browser is running.
 *  Firestore holds the number that SHOULD be running, at
 *  `events/{EVENT_ID}/live/app`. Every phone listens to it; when the cloud
 *  number is higher than this one, that phone knows it is stale and says so.
 *
 *  ⚠️ BUMP THIS on every code push that matters. Forgetting it doesn't break
 *  anything visibly — the beacon just quietly stops protecting anyone. It
 *  fails silent, which is exactly why it's written at the top of the file.
 *
 *  The cloud number is NOT set by pushing code. A crew member running the new
 *  build presses "Publish to all phones" on the admin screen. Deliberate: the
 *  update is announced only after a real person has confirmed the new code
 *  actually loads, not at the moment a push leaves the laptop.
 */
export const BUILD = 22

// SDK is pinned to 12.16.0 (verified present on gstatic 2026-07-27). Import
// specifiers must be literal strings, so the version is written into each
// import in brain.js — change it there, and only deliberately.
