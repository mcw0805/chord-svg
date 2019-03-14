# Chord SVG

This is a prototype application-ish for dynamically generating SVGs of chord chart for stringed instruments on the server side with d3.js.

A lot of the implementation detail is similar to [vexchords](https://github.com/0xfe/vexchords). However, vexchords used Raphäel, which was not flexible at all on the server side.

I added a feature, in which the user can also specify the fingering for the chord.


## Usage & Example

This app is built with node v10.15.0. 

To run the demo, 
 1. `npm install` to download dependencies
 2. `npm start` to view the example usages more closely on `localhost:8888` 


JSON data is formatted as follows:
```
    chordName: name of the chord

    stringFretInfo: Dictionary mapping each string to {fretNumber, <fingerNumber>} 

        fretNumber: Fret number the finger placement circle should go to. This should be a number between 1 and 5, inclusive. "x" indicates mute. 0 indicates open string 
        fingerNumber [optional]: Finger number to be placed on the fret. (Typically on guitar, index = 1, middle = 2, ring = 3, and pinky = 4) 
    chordStartFret: Fret number on the instrument the chord should start on. If not specified, it will default to 0 

    barreIndicator: Array of [ {fromString, toString, relativeFret, <fingerNumber>}, ...] position and placement for a barre. 

        fromString: String number of the start of the barre (higher number) 
        toString: String number of the end of the barre (lower number) 
        relativeFret: Fret number on the chord diagram the barre should be placed on 
        fingerNumber [optional]: Finger number used for barre 
```

Within your JavaScript, you can do the following:
```javascript
// specify setting
let ukuleleSetting = {
    NUM_STRINGS: 4,
    TUNING: ["G", "C", "E", "A"]
}

// create ChordSvg object with the intrument setting
// if no setting is specified, guitar string settings will be used
let exampleUkuleleChord = new ChordSvg(ukuleleSetting);

// declare chord data
let ukeCchordData = {
    chordName: "C",
    stringFretInfo: {
        s4: {
            fretNumber: 0
        },
        s3: {
            fretNumber: 0
        },
        s2: {
            fretNumber: 0
        },
        s1: {
            fretNumber: 3
        }
    },
    chordStartFret: 0,
    barreIndicator: []
}

exampleUkuleleChord.setChord(ukeCchordData);
let exampleSvg = exampleUkuleleChord.drawChord(); // do something with this
```

This will generate the following image:
<img src="https://github.com/mcw0805/chord-svg/blob/master/uke-c.png" />

More examples are provided in public/exampleChordData.

## Future Work

I am working on a form so that the user can specify the instrument/number strings/frets/chord configuration without having to generate the JSON themselves.

More documentations coming soon... which could mean months or years.