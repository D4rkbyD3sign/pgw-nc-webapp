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
3. Open `events` → `nc-2026` → `questions`
4. Delete the documents you want gone (the ⋮ menu beside each), or delete the whole `questions` collection to wipe it clean

Deleting questions does not break anything. The collection rebuilds itself the moment someone asks again.

---

## Where things live (for the curious, or for next year)

- **Everything for this conference** sits under `events/nc-2026/` in the database. For 2027, we change one line (`EVENT_ID` in `js/config.js`) and it's a fresh drawer — this year's record stays intact underneath.
- **The moderator login** is a single email/password in Firebase Authentication. Add or remove people there any time; it takes ten seconds and no code change.
- **The security rules** are in `firestore.rules` in this repo — they're what makes anonymous asking safe.

---

## What is NOT built yet (as at 27 July 2026)

Be honest with anyone you demo this to:

- **The live public site is not this version.** `d4rkbyd3sign.github.io/pgw-nc-webapp` still runs the old offline demo. Nothing here is on it until we push.
- **No per-session surveys yet.** Ben Ross's headline ask. They'll ride the same plumbing as Q&A.
- **No admin screen yet.** Editing schedule/speakers on the day still means a code change. The database is ready for it; the screen isn't built.
- **No rate limiting.** Anyone who has the address can post questions in a loop. Fine for fifty people in a room, needs fixing (Firebase App Check) before invitations go out publicly.
- **Not load-tested.** Two browsers on one machine is not fifty phones on hotel wifi. The rehearsal is scheduled and it is Lumen's to own.

---

*Questions about any of this — ask Lumen. If something in this document turns out to be wrong on the day, that's a bug in the document and it gets fixed, not worked around.*
