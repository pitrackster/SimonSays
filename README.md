# Simon Say's game

Super simple implementation of the game Simon Say's

- ReactJS
- Webaudio API
- Fonts from https://fonts.google.com/

### Original game infos

#### The game features 4 skill levels

- Repeat a sequence of 8 colours
- Repeat a sequence of 14 colours
- Repeat a sequence of 20 colours
- Repeat a sequence of 31 colours

#### Squares / Tiles

- Green square – G4 391.995 Hz
- Red square – E4 329.628 Hz
- Yellow square – C4 261.626 Hz
- Blue square – G3 195.998 Hz

#### Misc

- Sequence length: 1‐5, tone duration 0.42 seconds, pause between tones 0.05 seconds
- Sequence length: 6‐13, tone duration 0.32 seconds, pause between tones 0.05 seconds
- Sequence length: 14‐31, tone duration 0.22 seconds, pause between tones 0.05 seconds


### Install

`npm install && npm run webpack`


### Scripts

- `npm run webpack` - build javascript
- `npm run watch` - build javascript and watch for changes

### Known issues

- css not working well on firefox (tiles background)
- touch events works out of the box on Firefox 55.0.2 (no need to handle specific events) but not in Chrome Version 61.0.3163.79...

### TODO

- template for game / disposition of 'squares'
- make it rock solid (avoid user to press to tiles at once)

...