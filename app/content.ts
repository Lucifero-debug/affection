/* ═══════════════════════════════════════════════════════════════
   ❤  EDIT EVERYTHING HERE  ❤
   The only file you need to touch.

   WRITTEN FOR: the real situation, not a first confession.
   You have asked her before. She has answered, more than once, and
   clearly. You have not spoken in three weeks. Nothing below
   pretends otherwise — a page that acts like this is news would be
   the first thing she noticed, and the last thing she trusted.

   The tone throughout is: I know what you've told me. I'm not
   arguing with it. Here is the true version, once, and then I stop.
   ═══════════════════════════════════════════════════════════════ */

/* ── SECTIONS YOU CAN SWITCH OFF ───────────────────────────────  */
export const sections = {
  reel: true,
  gallery: true,
  counter: true,
};

export const her = {
  name: "Kanishka",
  shortName: "Kanishka",
  /** The way she writes it herself. Set in Devanagari throughout. */
  nameDevanagari: "कनिष्का",
  fullName: "Kanishka Vinayak",
  kicker: "not another attempt to change your mind",
  tagline: "You have already answered this. I wanted to answer you properly.",
  siteTitle: "कनिष्का — Kanishka",
  siteDescription: "The last thing I wanted to say, said properly.",
};

/** The line that types out over the opening curtain. */
export const overture = {
  line: "You have said no. I heard you. This is not that conversation.",
};

/* ── HERO PORTRAIT ─────────────────────────────────────────────
   Empty on purpose. With no src the arch renders as a quiet frame. */
export const heroPhoto = {
  src: "/photos/hero.jpeg",
  alt: "Kanishka",
};

/* ── CHAPTER I — the honest opening ────────────────────────────
   Wrap a word in *asterisks* to set it in rose italic.            */
export const statement = {
  chapter: "I",
  label: "the honest part",
  words:
    "I have asked you this before and you have told me no, clearly, more than once, and you were right to. So I want to be careful about what this is. It is not a better argument. It is not me hoping that if I make something nice enough the answer changes. It is the *true* version of what I have been carrying, said once, properly, and then put down.",
  pullQuote: "You were honest with me every time. I owe you the same.",
};

/* ── THE REEL — the one section where she moves ────────────────
   Drop the clips in `public/videos/`. Each one plays silently the
   moment it is on screen and stops the moment it isn't; the sound
   button is hers to press.

   aspect   — the shape of the frame: "portrait" (anything shot on a
              phone), "landscape", or "square".
   poster   — the still held until the first frame arrives. Optional,
              but it makes the load look deliberate rather than empty.
   captions — an optional .vtt file, if she is saying something.

   Add as many clips as you like: with more than one, numbered
   switches appear under the frame.                                 */
export const reel: {
  eyebrow: string;
  tail: string;
  clips: {
    src: string;
    poster?: string;
    label?: string;
    caption?: string;
    captions?: string;
    aspect?: "portrait" | "landscape" | "square";
  }[];
} = {
  eyebrow: "the reel",
  tail: "…and a hundred more I haven't put here yet.",
  clips: [
    {
      src: "/videos/1.mp4",
      poster: "/photos/1.jpeg",
      label: "Kanishka, mid-sentence",
      caption: "Mid-sentence, as usual",
      aspect: "portrait",
    },
    {
      src: "/videos/2.mp4",
      poster: "/photos/2.jpeg",
      label: "Kanishka, laughing",
      caption: "The laugh, caught early",
      aspect: "portrait",
    },
    {
      src: "/videos/3.mp4",
      poster: "/photos/3.jpeg",
      label: "Kanishka, somewhere else entirely",
      caption: "Thinking about something else entirely",
      aspect: "portrait",
    },
    {
      src: "/videos/4.mp4",
      poster: "/photos/4.jpeg",
      label: "Kanishka on a good day",
      caption: "A good day",
      aspect: "portrait",
    },
    {
      src: "/videos/5.mp4",
      poster: "/photos/5.jpeg",
      label: "Kanishka — the favourite one",
      caption: "This one is my favourite",
      aspect: "portrait",
    },
    {
      src: "/videos/6.mp4",
      poster: "/photos/6.jpeg",
      label: "Kanishka, an ordinary evening",
      caption: "Nothing happening at all, and still worth keeping",
      aspect: "portrait",
    },
  ],
};

/* ── CHAPTER III — WHAT YOU ACTUALLY DID ───────────────────────
   These are true — they are about how she has treated you, which
   is the one thing you can write about honestly. Replace them with
   your own specifics where you have them.                         */
export const facts = {
  chapter: "III",
  label: "things you did",
  items: [
    {
      label: "the answer",
      title: "You never left me guessing",
      body: "You said no plainly, and you did not dress it up to make it easier on yourself. A lot of people would have gone vague and let me work it out over months. You did not do that to me, and I know what it cost you to be that direct.",
    },
    {
      label: "afterwards",
      title: "You kept being my friend anyway",
      body: "You had every reason to pull away and you did not. You kept turning up in the conversation, and you were not cold about it once. I do not think I appreciated that properly at the time.",
    },
    {
      label: "the word",
      title: "You called me your best friend",
      body: "I have spent a while being frustrated by that word, which was unfair of me, because it is not a consolation prize. It is a real thing you gave me and I have been treating it like a smaller version of something else.",
    },
    {
      label: "the last three weeks",
      title: "You went quiet, and that was fair",
      body: "We have not spoken since the nineteenth of August. I noticed, and I am not going to pretend I did not. I also understand it — I had made every conversation carry something it should not have had to carry.",
    },
  ],
};

export const gallery = {
  chapter: "—",
  label: "photographs",
  heading: "A few frames,",
  headingItalic: "and none of them do it",
  sub: "Which is roughly the problem with this whole page.",
  photos: [
    { src: "/photos/1.jpeg", alt: "Kanishka", caption: "Mid-sentence, as usual." },
    { src: "/photos/2.jpeg", alt: "Kanishka", caption: "The laugh, caught early." },
    { src: "/photos/3.jpeg", alt: "Kanishka", caption: "Thinking about something else entirely." },
    { src: "/photos/4.jpeg", alt: "Kanishka", caption: "A good day." },
    { src: "/photos/5.jpeg", alt: "Kanishka", caption: "This one is my favourite." },
    { src: "/photos/6.jpeg", alt: "Kanishka", caption: "No occasion. Just a Tuesday." },
  ] as { src: string; alt: string; caption?: string }[],
};

/* ── CHAPTER V — THE LETTER ────────────────────────────────────
   THE ONE THAT MATTERS. Rewrite this in your own words. Mine is a
   scaffold — the shape is right, the voice should be yours.      */
export const letter = {
  chapter: "V",
  label: "the letter",
  sealInitial: "K",
  prompt: "break the seal",
  paragraphs: [
    "I have asked you to be with me more than once, and every time you have said no. I want to start with that, because I have spent months acting as though it were a question still open for negotiation, and it was not. You answered me. I just did not want the answer, so I kept asking, and that was not fair to you.",
    "Here is the part that is true and does not require anything from you: knowing you since January has been the best thing about this year. Not the wanting — the knowing. The actual conversations. I let the wanting get so loud that I stopped being much of a friend to you, and I am sorry for that, genuinely and without a request attached.",
    "We have not spoken in three weeks. I think that is because every conversation had started to feel like it might turn into this one, and you should not have to brace yourself to talk to me. So I am saying all of it here, once, so that it is out of the way and none of it has to sit under the next thing you say to me.",
    "You do not owe me a reply to this. If you want to leave it, leave it, and I will take that as read and not raise it again.",
  ],
  signature: "Your friend, and I mean that",
};

export const finale = {
  small: "and that is all of it, finally out of the way",
  line: "You do not have to answer this.",
  lineItalic: "I just wanted you to have the true version.",
};

export const music = {
  enabled: true,
  /* Start the song on load. Browsers will not allow audible sound until the
     page has been given a gesture, so it begins on her first tap if the
     opening request is refused. Set false to go back to tap-to-play. */
  autoplay: true,
  src: "/music/songs.mpeg",
  title: "a song",
};

export const footer = {
  line: "Said once, and then left alone.",
};

/* ═══════════════════════════════════════════════════════════════
   ❤  THE MIDDLE MOVEMENTS  ❤
   ═══════════════════════════════════════════════════════════════ */

export const traits = ["honest", "funny", "kind", "unmistakably yourself"];

/* ── CHAPTER II — THE ACTUAL ARC ───────────────────────────────
   Your side, told straight, including the parts that do not
   flatter you. That is what makes it worth reading.              */
export const timeline = {
  chapter: "II",
  label: "how this actually went",
  heading: "Told straight,",
  headingItalic: "including the parts I got wrong",
  sub: "There is no version of this where I come out looking clever.",
  milestones: [
    {
      when: "January",
      title: "We started talking",
      body: "I did not think anything of it at first, which is funny in hindsight. It was just easy. It has stayed easy, which is most of the problem.",
    },
    {
      when: "somewhere in the spring",
      title: "I stopped being able to call it nothing",
      body: "I tried several very sensible explanations for why I looked forward to my phone lighting up. None of them held up for more than about a day.",
    },
    {
      when: "the first time I asked",
      title: "You said no",
      body: "Clearly, and kindly, and without leaving me anything to misread. I told myself I had handled it well. I had not — I had just gone quiet about it for a while.",
    },
    {
      when: "and then again",
      title: "I asked again anyway",
      body: "More than once. Each time I told myself it was different, and each time it was the same question with new packaging. You answered it the same way, because it was the same question.",
    },
    {
      when: "the nineteenth of August",
      title: "We stopped talking",
      body: "I do not think that was a decision either of us announced. I think it was what happens when one person makes every conversation heavy enough that the other stops reaching for it.",
    },
    {
      when: "today",
      title: "So — this, and then I stop",
      body: "Not a better argument. Just the honest account, in one place, so it is not sitting underneath everything else I ever say to you.",
    },
  ],
};

/* ── CHAPTER IV — REASONS ──────────────────────────────────────
   These are about her, not about what you want from her.          */
export const reasons = {
  chapter: "IV",
  label: "reasons",
  heading: "Why it was you,",
  headingItalic: "for whatever it is worth now",
  hint: "drag a card away",
  items: [
    "Because you are the most interesting person in most rooms and appear not to have noticed.",
    "Because you told me the truth when a softer answer would have been easier for you.",
    "Because your terrible jokes have quietly colonised my sense of humour.",
    "Because you are curious about everything, and it turns out that is contagious.",
    "Because you did not go cold on me when you had every right to.",
    "Because talking to you made an ordinary Tuesday feel like it had been scheduled on purpose.",
    "Because none of the above is a reason you owe me anything, and it is all still true.",
  ],
};

/* ── THE COUNTER ───────────────────────────────────────────────
   The friendship, not an anniversary — and deliberately not the
   three weeks of silence, which would read as a guilt trip.
   Set `start` to the day you two actually started talking.
   Format: YEAR-MONTH-DAY T HOUR:MINUTE                            */
export const since = {
  start: "2026-01-15T20:00:00",
  kicker: "we have been talking since",
  line: "which comes to",
  units: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
  footnote: "and the friendship is the part I do not want to lose",
  heartbeats: "heartbeats, most of them glad",
};

/* ── THE QUESTION ──────────────────────────────────────────────
   Read this carefully before you change it.

   She has answered this several times. So the question here is not
   "will you" — it is whether there is anything left to revisit, and
   it comes with a commitment to stop asking. Both buttons work, and
   "no" is the one that closes the subject for good.

   The promise not to ask again is the most persuasive thing on this
   page, and it only works if you actually keep it.                */
export const question = {
  kicker: "the last time I bring this up",
  ask: "Is there anything here you would want to revisit?",
  aside:
    "Both buttons work. If it is no, it is no for good — I will not raise it again, and I would still like my friend back.",
  yes: "maybe, let's talk",
  no: "no — and that's final",
  celebration: {
    line: "Then call me when you're ready.",
    sub: "No rush, and no expectations.",
  },
  declined: {
    line: "Understood. That's the end of it.",
    sub: "Thank you for reading the whole thing.",
    body: "I meant what I said — I will not bring this up again, and I am not going to be strange about it. If you ever want to just talk about something completely unrelated, I am around, and it will be easy, like it was in January.",
    back: "close this",
  },
};

/* ── INTERLUDE — THE CONFESSION ────────────────────────────────  */
export const confession = {
  kicker: "the things I should have said instead of asking again",
  lines: [
    "I heard you the first time. I just did not want to.",
    "I made every conversation carry something it should not have had to carry.",
    "Being your friend was never the runner-up prize. I treated it like one.",
    "You do not owe me anything for having been honest with me.",
  ],
};

/* ── INTERLUDE — THE HEARTLINE ─────────────────────────────────  */
export const heartline = {
  small: "measured, for the record",
  line: "Resting rate, seventy‑two.",
  lineItalic: "And then your name comes up.",
};

/* ── INTERLUDE — IN EVERY LANGUAGE ─────────────────────────────  */
export const languages = {
  kicker: "one sentence, everywhere",
  line: "However you say it,",
  lineItalic: "it is the same sentence.",
  items: [
    { lang: "Hindi", phrase: "मैं तुमसे प्यार करता हूँ" },
    { lang: "English", phrase: "I love you" },
    { lang: "Punjabi", phrase: "ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ" },
    { lang: "Urdu", phrase: "میں تم سے محبت کرتا ہوں" },
    { lang: "French", phrase: "Je t'aime" },
    { lang: "Italian", phrase: "Ti amo" },
    { lang: "Spanish", phrase: "Te quiero" },
    { lang: "Portuguese", phrase: "Eu te amo" },
    { lang: "German", phrase: "Ich liebe dich" },
    { lang: "Greek", phrase: "Σ' αγαπώ" },
    { lang: "Japanese", phrase: "愛してる" },
    { lang: "Korean", phrase: "사랑해" },
    { lang: "Arabic", phrase: "أحبك" },
    { lang: "Bengali", phrase: "আমি তোমাকে ভালোবাসি" },
    { lang: "Tamil", phrase: "நான் உன்னை காதலிக்கிறேன்" },
    { lang: "Russian", phrase: "Я люблю тебя" },
  ],
};

/* ── CHAPTER VI — WHATEVER YOU'RE FEELING ──────────────────────
   Notes that hand her the exits rather than close them. The one
   that says "you want to leave this where it is" is the most
   important card on the page. Do not remove it.                   */
export const openWhen = {
  chapter: "VI",
  label: "whatever you're feeling",
  heading: "Notes for however",
  headingItalic: "you are taking this",
  hint: "tap a note to open it",
  notes: [
    {
      when: "you're tired of this subject",
      body: "Completely fair. You have been patient about it longer than most people would have been. This is the last of it — there is no next version of this page, and I am not going to start the conversation up again.",
    },
    {
      when: "you want to leave this where it is",
      body: "Then leave it. You do not have to reply, and not replying is not rude. I will take the silence as your answer and I will not treat you any differently for it.",
    },
    {
      when: "you're annoyed I made a whole website",
      body: "Reasonable. In my defence it is the only way I could get the whole thing out in one piece instead of in fragments over six months, which is what I have been doing to you.",
    },
    {
      when: "you feel guilty",
      body: "Please do not. You have not done a single thing wrong here. You were honest, repeatedly, and I kept asking anyway. That was mine to fix, and this is me fixing it.",
    },
    {
      when: "you want to talk about something else entirely",
      body: "Yes. Genuinely. Send me something stupid and unrelated and I will match your energy exactly and never mention any of this.",
    },
    {
      when: "you just want to know I'm okay",
      body: "I am. This was the hard part and it is done now. Whatever you decide, I am better for having said it plainly instead of hinting at it for another six months.",
    },
  ],
};

/* ── CHAPTER VII — TRUE EITHER WAY ─────────────────────────────
   Not conditional on her answer. That is the entire point.        */
export const promises = {
  chapter: "VII",
  label: "true either way",
  heading: "These do not depend",
  headingItalic: "on what you say next",
  sub: "Which is how you can tell they are real.",
  items: [
    "I will not ask you this again. Not in a year, not after a bad night, not once more just to be sure.",
    "I will not go cold on you to make a point.",
    "I will not make you responsible for how I feel about you.",
    "I will not bring it up sideways, in a joke, at two in the morning.",
    "I will take a no as a whole answer and not as an opening position.",
    "I will still turn up when you need someone, and it will not come with a bill.",
    "If being friends turns out to be too hard for me for a while, I will say so honestly rather than disappearing on you.",
  ],
};

/* ── INTERLUDE — PRESS AND HOLD ────────────────────────────────  */
export const hold = {
  kicker: "one last thing, and then the page is finished",
  prompt: "press and hold",
  holding: "keep holding",
  secret: {
    line: "Nothing here needs an answer.",
    body: "I built this to put something down, not to pick anything up. You have already told me what you think, more than once, and I believe you. The friendship was never the thing I was settling for — I was just too busy wanting something else to notice what I already had.",
    sign: "that's it, that's the whole page",
  },
};

/* ── THE DRAFTS ────────────────────────────────────────────────
   The messages you typed and did not send since the nineteenth.
   REPLACE THESE WITH REAL ONES. Scroll back through your own drafts
   and deleted-before-sending — the small ordinary ones are the ones
   that land. Nothing here should read as "why haven't you replied";
   that turns a true thing into a demand.                          */
export const drafts = {
  kicker: "typed since the nineteenth of august",
  heading: "A lot of drafts.",
  headingItalic: "None of them sent.",
  messages: [
    { when: "23 august", text: "this song came on and I thought of you. that is the whole message, there is no second part" },
    { when: "27 august", text: "I hope I did not make things weird. I think I made things weird" },
    { when: "31 august", text: "you would have found this so annoying and I have nobody to tell" },
    { when: "3 september", text: "nothing important. just checking you are okay" },
    { when: "6 september", text: "I keep starting these and stopping. I do not think I know how to be normal about it yet, but I am working on it" },
    { when: "8 september", text: "I miss talking to you. That is it, that is the message" },
  ],
  footer:
    "I did not send any of them, because none of them were the thing I actually needed to say. This page is.",
};
