const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


const PORT = process.env.PORT || 8888;

const ChordSvg = require('./chord-svg/ChordSvg');

// __dirname gives the path of the currently running file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exampleChordData = require('./public/exampleChordData.json');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {

//     res.render('imgGenerateForm', {
//         exampleChordData: exampleChordData
//     });
// });

app.get('/', (req, res) => {    
    let ukeSetting = {
        NUM_STRINGS: 4,
        TUNING: ["G", "C", "E", "A"]
    }

    let uc = new ChordSvg(ukeSetting);
    let ukeF = {
        chordName: "F",
        stringFretInfo: {
            s4: {
                fretNumber: 2
            },
            s3: {
                fretNumber: 0
            },
            s2: {
                fretNumber: 1
            },
            s1: {
                fretNumber: 0
            }
        },
        chordStartFret: 0,
        barreIndicator: []
    }
    // let ukeC = {
    //     chordName: "C",
    //     stringFretInfo: {
    //         s4: {
    //             fretNumber: 0
    //         },
    //         s3: {
    //             fretNumber: 0
    //         },
    //         s2: {
    //             fretNumber: 0
    //         },
    //         s1: {
    //             fretNumber: 3
    //         }
    //     },
    //     chordStartFret: 0,
    //     barreIndicator: []
    // }

    // uc.setChord(ukeC);
    // uc.setNumFrets(4);
    //uc.changeGridUnitSize(32);
    //let svg2 = uc.drawChord();

    addedImgData = [];
    for (let i = 0; i < exampleChordData.length; i++) {
        jsonData = exampleChordData[i];
        let exChord = new ChordSvg();

        if (i == 2) { // hard coding b/c I know at i==2, I have ukulele data
            exChord = new ChordSvg(ukeSetting);
        }
        exChord.setChord(jsonData);
        let exSvg = exChord.drawChord();
        addedImgData.push({chordJson: jsonData, svg: exSvg});
    }
    // let ex1 = new ChordSvg();
    // ex1.setChord(exampleChordData[0]);
    // let ex1Svg = ex1.drawChord();

    res.render('displayImg', {
        exampleChordData: exampleChordData,
        chordData: addedImgData
    });
});

let server = app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

module.exports = app;

// https://stackoverflow.com/questions/28282889/node-js-body-parser-wont-parse-input-names-with-square-brackets-in-json