# Videos

Drop her clips in this folder, then point at them from `reel` in
`app/content.ts`. Paths always start with `/videos/`.

## What the page expects by default

| File     | Where it appears                    |
| -------- | ----------------------------------- |
| `1.mp4`  | the reel — "Kanishka, in motion"    |

One clip is enough. Add more to `reel.clips` and numbered switches
appear under the frame.

## How the clip behaves

It starts **silent** and plays only while the section is on screen —
it stops the moment she scrolls past. The sound button in the corner
is hers to press; nothing makes noise on its own. If she has asked her
phone or laptop for reduced motion, the clip holds on its poster frame
until she presses play.

## Before you add them

- `.mp4` (H.264) plays everywhere. `.webm` is smaller but not universal.
- Keep it short — 5 to 15 seconds loops best.
- Keep it under ~10 MB. The page loads it as she reaches the section,
  but a 60 MB export will still stall on a phone.
- Set `aspect` in `app/content.ts` to match the shape you shot:
  `"portrait"` for phone video, `"landscape"`, or `"square"`.
- Give each clip a `poster` (any photo path) so the frame is warm
  rather than black while the video loads.

Until the file exists you'll see a placeholder naming the exact path
to add — never a broken player.
