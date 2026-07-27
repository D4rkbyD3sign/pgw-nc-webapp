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

**Right now, while we're building:** the addresses are `localhost:8080`, `localhost:8080/#/mod` and `localhost:8080/#/screen`, and they only work on Adam's machine while the preview server is running. When the real domain lands, the addresses change and everything else stays identical.

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

- **The live public site is not this version.** `d4rkbyd3sign.github.io/pgw-nc-webapp` still runs the old offline demo. Nothing here is on it until we push.
- **No prize draw on survey completion.** Deferred deliberately — surveys first, incentive after.
- **Admin covers TIMES ONLY.** Titles, speakers, partners, Wi-Fi and venue still need a code change.
- **No rate limiting.** Anyone who has the address can post questions in a loop. Fine for fifty people in a room, needs fixing (Firebase App Check) before invitations go out publicly.
- **Not load-tested.** Two browsers on one machine is not fifty phones on hotel wifi. The rehearsal is scheduled and it is Lumen's to own.

---

*Questions about any of this — ask Lumen. If something in this document turns out to be wrong on the day, that's a bug in the document and it gets fixed, not worked around.*
