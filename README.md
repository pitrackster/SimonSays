# Simon Say's game

Super simple implementation of the game Simon Say's

- ReactJS
- ToneJS
- Fonts from https://fonts.google.com/

### Original game infos

#### The game features 3 skill levels

- Repeat a sequence of 8 colours
- Repeat a sequence of 14 colours
- Repeat a sequence of 20 colours
- Repeat a sequence of 31 colours

#### Squares

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


### TODO

- error sound
- css not working well on firefox
- template for game / disposition of 'squares'
- touchable interface (hammerJS ?)
...