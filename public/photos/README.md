# Photos

Drop her pictures in this folder, then point at them from `app/content.ts`.
Paths always start with `/photos/`.

## What the page expects by default

| File                 | Where it appears                                    |
| -------------------- | --------------------------------------------------- |
| `hero.jpg`           | the arched portrait in the opening                  |
| `1.jpg` … `6.jpg`     | the gallery grid + lightbox                         |

Six photos is enough to fill the whole page. One of them can double as the
`poster` for the reel — see `public/videos/README.md`, since the reel itself
is video now.

## Anything goes

Any filename works — just change the `src` values in `app/content.ts`.
Any aspect ratio works too: the gallery is a masonry that flows around
whatever shape you give it.

## Before you add them

Resize to roughly 1600px on the long edge. The page loads every photo the
browser can see, so full-size phone exports will make it feel sluggish.
`.jpg`, `.png`, and `.webp` all work.

Until a file exists you'll see a warm placeholder naming the exact path to
add — never a broken image.
