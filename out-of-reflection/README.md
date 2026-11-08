# Out of Reflection

A short browser observation game about unreliable reflections.

Play online: https://dnallur1.github.io/out-of-reflection/

To run locally from this folder:

    python3 -m http.server 8765 --bind 127.0.0.1

Open http://127.0.0.1:8765/ (ES modules require an HTTP server).

## Rules

Click or tap a mismatch in either the room or reflection. Find 3 differences in the living room, 5 in the kitchen and 7 in the bedroom: 15 discoveries total. Each room starts in black and white. Each discovery earns 100 points, restores an equal share of that room’s colour, and clears its mirror blur. Completing a room leaves it fully coloured with an explicit completion message; Continue opens the next room. The final room shows an all-rooms-complete ending. Found differences resolve and cannot score again from either view. In level 1, each correct discovery replaces all remaining mismatches with new ones. The first comparison offers a flower, lamp and plant; the second offers a clock and picture; the final comparison offers a cushion. Only one discovery counts from each comparison, so three finds complete the room. Later rooms keep their remaining differences until completion. Each room permits two wrong selections; a third wrong selection locks that attempt and offers a room-only retry. Matching objects and empty scene space both count as wrong selections. Correct discoveries and hints use no extra chances. A retry resets current-room discoveries, colour and earned points while preserving completed rooms. Each new room restores both chances. Wrong clicks trigger a visible alert and error tone; sound defaults on and can be muted. Hints give a short text clue for a remaining mismatch without outlining or selecting the answer. Each stage opens a separate room: living room, kitchen, then bedroom. The living room uses a changing pool of flower, lamp, plant, clock, picture and cushion differences. The kitchen differences are its kettle, fruit bowl, oven towel, glass cabinet door and shelf jar. The bedroom differences are its pillow, bedspread, bedside books, moon mobile, botanical picture, bedside lamp and wardrobe handles. In the final stage, all seven discoveries change the real room to match the reflection, so the final room is the same regardless of discovery order. Restart resets the puzzle, score, and progress. Keyboard selection uses native buttons. Correct discoveries show a brief ring, checkmark, eight small sparks and a soft colour bloom in both views. Decorative layers ignore input and remove themselves after the animation. Reduced motion skips these effects and disables transitions. Sound is synthesized locally.

## Layout

The playful paper-and-stickers page uses a bold title, a three-step journey strip, pastel progress bar, text-clue strip, framed comparison panels and a completion card below the images. Two landscape room views share a comparison board without stretching the illustrations. Instructions, score, level, per-level progress, and restart sit above the board. The living room has a sofa, shelves and coffee table; the kitchen has a cooker, tiled backsplash, sink and cupboards; the bedroom has a bed, wardrobe, bedside table and moon mobile. All three use the same ink-and-paper cartoon treatment. A shared illustration detail layer adds furniture contact shadows, upholstery piping, woodgrain, cabinet bevels, oven hardware, ceramic marks, frame borders, drapery folds and stitched textiles. Details belonging to removable mismatch objects disappear with them.

## Verification

- `node check-rules.mjs`: checks all 168 reachable subsets and 540 selection transitions, covering all 3,628,800 discovery orders. Verifies 3/5/7 stage targets, valid artwork and hit areas, duplicate prevention, explicit Continue gates, room transitions, final score 1,500 and matching final views.
- Browser: completed all 15 discoveries using both views; verified completion messages after finds 3 and 8, Continue opens the next room, ending after find 15, progress maxima 3/5/7, hints, gradual room colour from 0 to 1, and restart to 0/3 and score 0. No console errors. Redesigned layout checked at desktop, 390px and 320px widths; mobile opening card, non-overlapping controls, journey indicators, final score, restart, and completion placement verified. The illustration refinement was checked through all 15 discoveries, with screenshots of each completed room. Discovery animation checked in both views (two effects, sixteen sparks), automatic cleanup and Continue transition verified.

## Publishing

Push changes to `main` to run the puzzle checks and publish the game through GitHub Actions to GitHub Pages. Game files are served from `out-of-reflection/`. No build step or external service is required.

## Help and publication preference

Help opens as a native modal dialog without resizing or repositioning the illustration board; checked on desktop and 390px mobile, including Back to game, Escape and unchanged chances. Publish future changes only when the user explicitly asks.
