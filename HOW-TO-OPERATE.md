# How to Operate — PGW National Conference App

**ImplementAI 2026 · Hobart · 29 October 2026**
*Written 27 July 2026. This is the practice sheet and the on-the-day sheet. Same document — practise on it now so it's boring by October.*

---

## The one-paragraph version

It is **one app worn three ways**. Attendees open it on their phones and ask questions anonymously. You open the same app at a different address and see every question as it arrives. You approve the good ones and send them to the big screen. Nobody logs in except you.

---

## The three faces

| Face | Where | Who |
|---|---|---|
| **The guide** | the plain address | Every attendee, on their phone |
| **The moderator desk** | add `#/mod` to the address | You (or whoever runs Q&A) |
| **The room screen** | add `#/screen` to the address | The laptop driving the projector |
| **Pulse results** | add `#/results` to the address | You — **never shown to attendees** |
| **Admin** | add `#/admin` to the address | You — running late, session times |

They are not three apps. They are three doors into one. That's why the whole thing updates itself without anyone refreshing.

**The real address, since 2026-09-08:** **`app.pgwconference.com.au`** — so the moderator desk is `app.pgwconference.com.au/#/mod`, the room screen `app.pgwconference.com.au/#/screen`, results `/#/results`, admin `/#/admin`. This is the app's permanent home; it never moves once attendees have it. The old `d4rkbyd3sign.github.io/pgw-nc-webapp` address redirects here.

~~**Right now, while we're building:** the addresses are `localhost:8080`, `localhost:8080/#/mod` and `localhost:8080/#/screen`, and they only work on Adam's machine while the preview server is running. When the real domain lands, the addresses change and everything else stays identical.~~ *(superseded 2026-09-08 — the domain landed.)*

---

## Before the day

### One week out
- [ ] **Clear the board.** Delete all practice questions (see *Clearing the board* below). Do this once, a week out, and again the morning of.
- [ ] **Sign in on the actual screen laptop.** Not your laptop — the one that will be plugged into the projector. It remembers you afterwards.
- [ ] **Sign in on the actual moderator device.** Same reason.
- [ ] **Check the agenda is right** — session titles and times drive what questions get tagged to.

### The morning of
- [ ] **Screen laptop on ethernet if at all possible**, or the strongest wifi in the room. It holds one long connection all day; it is the thing to protect.
- [ ] Open `#/screen`, press **F11** for full screen, and leave it.
- [ ] Open `#/mod` on your device. Confirm you can see the queue.
- [ ] **Send yourself one test question from a phone.** Watch it appear on the desk. Approve it, send it to screen, then Done. That's your smoke test — ninety seconds, and you'll know the whole chain is alive.
- [ ] **Clear the board again** so the room starts clean.

---

## Running it on the day

### What you'll see on the moderator desk

Questions arrive in **Incoming**. Each one shows the question and, underneath in small type, **which session it belongs to** — the app tags it automatically from whatever is on at that moment.

### The four buttons

| Button | What it does |
|---|---|
| **APPROVE** | Moves the question to *Approved — ready*. It is **not** on the screen yet. This is your holding pen. |
| **DISMISS** | Sends it to history. Nobody sees it. The asker's phone will show CLOSED. |
| **TO SCREEN** | Puts it on the big screen, live, right now. Whatever was on screen before moves to history automatically. |
| **DONE** | Takes the current question off the screen. The screen returns to the idle "Ask a question" state. |

### The rhythm that works

1. **Approve as they arrive**, while the speaker is still talking. Build a queue of good ones.
2. When Q&A time comes, hit **TO SCREEN** on the first one.
3. Speaker answers it.
4. Hit **TO SCREEN** on the next one — you do *not* need to press Done first. The new one replaces the old one.
5. When Q&A ends, hit **DONE** to clear the screen.

**The thing worth practising:** approving is not publishing. Two separate presses, deliberately. You can never accidentally put something on a wall in front of fifty advisers with one click.

### Named vs anonymous questions

**Anonymous is the default. Always.** Under the question box there's an unticked box: *"Add my name so the speaker can answer me directly"* (Johnny's ask). Tick it, type a name, and the question carries it.

Three things worth knowing, because someone will ask you:

- **The tick resets to off after every question.** The name is remembered on the phone so nobody retypes it all day, but *choosing to be named is a fresh decision each time.* Otherwise a person who named themselves in the morning asks something sensitive after lunch and only discovers their name is attached when it's on the wall.
- **The Send button tells you which one you're doing** — it reads *"Send anonymously"* or *"Send with my name"*. Nobody can send named by accident.
- **On your desk** a named question shows the name in lime before the session title. **On the big screen** the footer reads `AUDIENCE QUESTION · SARAH WHITFIELD` instead of `AUDIENCE QUESTION · ANONYMOUS`.

**You cannot edit or remove a name**, and neither can anyone else — the rules only let a moderator change a question's *status*, never its words or its name. If someone names themselves and regrets it, **dismiss the question**; it never reaches the screen.

**Pulse surveys are never named.** There is no name option there and there should never be one — the resonance data is only honest if it's anonymous.

### What the attendee sees

Their own questions, with a status chip that updates live:

- **SENT** — it arrived, waiting on you
- **APPROVED** — you approved it, not on screen yet
- **ON SCREEN** — it's up
- **SHOWN** — it's been and gone
- **CLOSED** — you dismissed it

They see **only their own**. Nobody can browse other people's questions, and nobody can see what was dismissed. That's enforced by the database itself, not by the app being polite about it.

---

## Running late — the admin screen

`#/admin`. **This is the one you'll actually use on the day**, because the thing that goes wrong at a conference is the clock.

### Running late

Four buttons: **-5, +5, +10, +15**, and **Back on time**.

Press **+10** while a session is over-running and three things happen at once, on every phone in the room, in about a second:

- The session **currently on stage** has its finish time pushed out 10 minutes
- **Every session after it** moves 10 minutes later
- Sessions that already **finished** are left exactly as they were

Press it twice for twenty. Press **-5** to claw time back if you catch up. Press **Back on time** to undo the lot and return the day to its printed schedule.

**You do not need to touch each session.** That's the whole point of the control.

### Hand-editing one session

Each row has editable start and end times. Type over them and it saves as you leave the field. A hand-edited row is outlined lime and says **hand-edited**, with a **Reset** button to put it back.

**A hand-edited session ignores the running-late shift entirely.** If you typed 16:15, it stays 16:15 — pressing +10 will not quietly make it 16:25. If you want it to move with everything else, press Reset first.

### What can't be changed here

Titles, speakers, rooms, Wi-Fi and venue are in the code, not the admin. Changing those still needs Lumen and a push. This was a deliberate choice: a small tool you trust beats a big one you hesitate over while fifty people wait.

### If the cloud is unreachable

Phones fall back to the schedule built into the app. Attendees see the original printed times — never a blank agenda. Your changes reappear the moment the connection returns.

---

## Pulse surveys (per-session feedback)

**You do not operate these.** They run themselves. This section is so you can explain them and read the results.

**What an attendee sees.** When a session finishes, a card appears at the top of their home screen: *"How was it?"* with the session name. One tap opens a single question — **How useful was this session?** — rated **1 (not useful at all) to 5 (very useful)**, plus an optional comment box. Ten seconds, then it's gone and it never asks again for that session.

**The 90-minute window.** The card chases the freshest session they haven't rated, going back **90 minutes**. So someone who stepped out for a coffee still gets asked about the session they missed the prompt for — but nobody is ever handed a stack of six surveys to work through. If they've rated everything recent, no card appears at all.

**Reading the results.** Go to `#/results`. Sessions are ranked by average rating, highest first, each showing the average out of 5, a plain-English label, how many people responded, and every comment left. It updates live as responses land.

**Anonymity — say this plainly if anyone asks.** No login, no device ID, no name is attached to a rating. "Have I already rated this?" is remembered **on the phone itself**, not on the server. The server knows *"seven people rated this session"* and cannot know *who*. That is deliberate: the Ask screen promises anonymity, and a survey that quietly tracked people would make that promise a lie.

**Who can see results.** Only signed-in crew, enforced twice: the screen requires sign-in, **and** the database refuses to hand over responses to anyone else — even if someone typed the URL directly. Responses are locked down harder than questions.

---

## If something goes wrong

**The screen has frozen / gone blank.**
Refresh the page (F5). It will sign you straight back in and reconnect — you will not be asked for a password, and you will not lose any questions. They live in the cloud, not in the browser.

**A question isn't appearing on the desk.**
Check your device has internet. The desk needs a live connection to receive; the *asker's* phone does not — a phone with no signal holds the question and sends it when the signal returns.

**You accidentally dismissed a good question.**
It's in **History** at the bottom of the desk. It can't be un-dismissed with a button today. Ask the person to send it again, or read it out yourself.

**You accidentally hit Done too early.**
Just hit **TO SCREEN** on it again from wherever it sits. Nothing is lost.

**Someone posts something inappropriate.**
Dismiss it. It never touched the screen — that's the entire reason approving and publishing are separate presses.

**Everything is broken and there are fifty people watching.**
Close the screen tab. Run the Q&A on voices for that session. The app failing is a smaller problem than you visibly fighting with it. Then refresh and come back next session.

---

## Signing out — and why it matters

**A signed-in browser stays signed in.** Close the tab, close the browser, come back
tomorrow — you're still in. That's deliberate: it stops the room screen showing a
login form to fifty people after a reload.

The cost is that **the browser itself is the key.** Anyone who picks up that laptop
can open the moderator desk and read every question, including the ones you
dismissed. Someone's rejected question is meant to stay between them and you.

So: **sign out when the device leaves your hands.** There's a **Sign out** button at
the bottom of the moderator desk, the results screen and the admin screen. It asks
twice — one tap arms it, the second does it — because signing out by accident
mid-session is an irritation nobody needs.

Sign out when: the conference is over · the laptop goes back to the venue · you
borrowed someone's machine · anything is being handed to a person who isn't crew.

*(Added 2026-07-28. Until then there was no way to sign out at all — the function
existed in the code but nothing called it.)*

---

## Pushing a code change while people are using it

Almost nothing needs this. Times, speakers and questions all live in the cloud and
reach every phone in about a second — that's the whole design. This section is only
for the rare case where the **code itself** has to change on the day.

The problem it solves: a phone that opened the app at 9am is still running 9am's
code at 3pm. Pushing new code does nothing for that phone until it reloads, and it
has no reason to reload.

**So the app carries a version beacon.** Every phone knows which build it is running
and listens for which build it *should* be running. When those differ, a small dark
bar appears above the tab bar: *"A newer version of the app is ready"* with a
**Refresh** button.

**To publish an update:**

1. Push the code as normal, and wait for it to go live (about a minute).
2. **Open the app yourself and confirm the new version actually loads.** Don't skip
   this — it's the safety catch.
3. Go to the admin screen (`#/admin`) → **App version**.
4. Press **Publish to all phones.**

Everyone else's phone shows the bar within a second or two.

**If you publish the wrong thing — roll it back.** If phones are nagging about a
build that never really went live, open the admin screen on any device. It will say
*"beacon says 17"* or whatever the wrong number is, and offer **"Roll the beacon back
to 16."** Press it. The bars disappear everywhere within a second or two, without
anyone touching their phone.

The rule underneath: **the beacon should always match what the live site actually
serves.** If it's higher than any real build, every phone nags and none of them can
ever satisfy it. Rolling back is always safe — it can only ever reduce nagging.

*(Rolling back was impossible until 2026-07-28. The button used to disable itself
whenever your device was behind, which meant that once the beacon was set too high,
every device was behind and nobody could fix it. Found by testing on two real
devices, which is the only reason it isn't a problem you'd have met in Hobart.)*

**Things worth knowing:**

- **It asks. It never reloads anyone's phone by itself.** Deliberate: a silent
  reload would delete a half-typed question out from under someone, and fifty
  phones reloading mid-presentation is worse than a slightly stale caption. The
  person taps when they're ready.
- **You cannot publish a version you aren't running.** If your own device is behind,
  the button is disabled and tells you to refresh first. That's the whole point of
  step 2 — the announcement can only come from someone who has proven the new code
  loads.
- **Every phone shows its build number** at the very bottom of the Home screen —
  small grey `BUILD 15`. When someone says "mine looks different," asking what that
  line says tells you in one second whether their phone is stale or you're chasing a
  real bug. Attendees will never notice it; you will need it.
- **The build number has to be bumped in the code** (`js/config.js`, `BUILD`). If
  whoever made the change forgot, the beacon simply says nothing. It fails quiet,
  not loud — so the bump is part of making a change, not an afterthought.
- **The room screen never shows the bar.** A banner across the big display in front
  of the room is worse than a stale one. Refresh that machine by hand (F5).
- **Within ten minutes of a push,** a refresh can still be served the old files from
  the phone's own cache. That's why publishing is a manual press some minutes after
  the push rather than something automatic.

---

## Clearing the board

Between practice runs, and before the real thing:

1. Go to **console.firebase.google.com** → project **pgw-nc**
2. **Firestore Database** → **Data**
3. Open `events` → `nc-2026` → and clear **both** collections:
   - `questions` — the Q&A
   - `responses` — the pulse surveys
4. Delete the documents you want gone (the ⋮ menu beside each), or delete a whole collection to wipe it clean

Deleting either collection breaks nothing. Both rebuild themselves the moment someone asks a question or rates a session.

⚠️ **Clear `responses` too, not just `questions`.** It's the easy one to forget, and stale practice ratings would quietly skew the real numbers you hand PGW afterwards.

---

## Where things live (for the curious, or for next year)

- **Everything for this conference** sits under `events/nc-2026/` in the database. For 2027, we change one line (`EVENT_ID` in `js/config.js`) and it's a fresh drawer — this year's record stays intact underneath.
- **The moderator login** is a single email/password in Firebase Authentication. Add or remove people there any time; it takes ten seconds and no code change.
- **The security rules** are in `firestore.rules` in this repo — they're what makes anonymous asking safe.

---

## What is NOT built yet (as at 27 July 2026)

Be honest with anyone you demo this to:

- ~~**The live public site is not this version.**~~ **Corrected 2026-07-28 — this was already stale when written.** `d4rkbyd3sign.github.io/pgw-nc-webapp` **is** serving the current build: verified by fetching it — the page loads `js/brain.js` (the real Firestore brain, not the mock) and `js/config.js` carries `EVENT_ID = 'nc-2026'`. `git rev-list origin/main...main` = `0 0`, so nothing is sitting unpushed. **The phone test with the guys is not blocked; the address works today.**
- **No prize draw on survey completion.** Deferred deliberately — surveys first, incentive after.
- **Admin covers TIMES ONLY.** Titles, speakers, partners, Wi-Fi and venue still need a code change.
- **No rate limiting.** Anyone who has the address can post questions in a loop. Fine for fifty people in a room, needs fixing (Firebase App Check) before invitations go out publicly.
- **Load-tested against the database, NOT against the room.** On 28 July 2026 Lumen ran 50 and then 100 simulated phones at the real Firestore project (in a throwaway drawer, `events/loadtest-2026-07-28`, so the conference data was never touched). **300 concurrent anonymous writes, zero errors, zero rejections**; sends acknowledged in ~0.45s at fifty, ~0.61s at a hundred. The database is not the risk. **Still untested:** hotel wifi, real phones and browsers, a sustained six-hour day, and the moderator/big-screen leg (that needs the crew sign-in). Full write-up: `Squad/PGW/PGW-NC-2026/Webapp/load-test-2026-07-28.md`.

---

*Questions about any of this — ask Lumen. If something in this document turns out to be wrong on the day, that's a bug in the document and it gets fixed, not worked around.*
