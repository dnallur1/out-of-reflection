# Out of Reflection

A small observation puzzle game: compare each room with its unreliable reflection, spot mismatches, and restore its colour.

**[Play the game](https://dnallur1.github.io/out-of-reflection/)**

## Development

The game source is in `out-of-reflection/`. It uses HTML, CSS, JavaScript, and SVG illustrations, with no external dependencies.

```sh
cd out-of-reflection
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/.

Run the puzzle checks:

```sh
node out-of-reflection/check-rules.mjs
```

## Deployment

The Pages workflow checks the puzzle rules and deploys `out-of-reflection/` whenever game changes are pushed to `main`.
