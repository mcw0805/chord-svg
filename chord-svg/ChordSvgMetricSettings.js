const CANVAS_WIDTH_UNIT = 14;
const CANVAS_HEIGHT_UNIT = 20;

const X_SHIFT_UNIT = 3;
const Y_SHIFT_UNIT = 2.5;

const FRET_SPACING_UNIT = 2.5;
const STRING_SPACING_UNIT = 2;

const BASE_CIRCLE_RADIUS_UNIT = 0.5;


const GRID_UNIT = 18;

const CANVAS_WIDTH = GRID_UNIT * 14;
const CANVAS_HEIGHT = GRID_UNIT * 20;

const X_SHIFT = 3 * GRID_UNIT;
const Y_SHIFT = 2.5 * GRID_UNIT;

// spacing between each fret
const FRET_SPACING_WIDTH = GRID_UNIT * 2.5;
const DEFAULT_NUM_FRETS = 5;

// spacing between each string
const STRING_SPACING_WIDTH = GRID_UNIT * 2;

// length of the string across all displayed fretboard
const STRING_LENGTH = FRET_SPACING_WIDTH * DEFAULT_NUM_FRETS; // length of string

const BASE_CIRCLE_RADIUS = GRID_UNIT / 2;

const calcCanvasWidth = (gridUnit) => {
    return gridUnit * CANVAS_WIDTH_UNIT;
}

const calcCanvasHeight = (gridUnit) => {
    return gridUnit * CANVAS_HEIGHT_UNIT;
}

const calcXShift = (gridUnit) => {
    return gridUnit * X_SHIFT_UNIT;
}

const calcYShift = (gridUnit) => {
    return gridUnit * Y_SHIFT_UNIT;
}

const calcFretSpacingWidth = (gridUnit) => {
    return gridUnit * FRET_SPACING_UNIT;
}

const calcStringSpacingWidth = (gridUnit) => {
    return gridUnit * STRING_SPACING_UNIT;
}

const calcBaseCircleRadius = (gridUnit) => {
    return gridUnit * BASE_CIRCLE_RADIUS_UNIT;
}

const calcStringLength = (gridUnit, numFrets) => {
    return calcFretSpacingWidth(gridUnit) * numFrets;
}

const calcNeckWidth = (gridUnit, numStrings) => {
    return calcStringLength(gridUnit) * (numStrings - 1);
}

const calcFretwireLength = (gridUnit, numStrings) => {
    return calcNeckWidth(gridUnit, numStrings);
}

module.exports = {
    GRID_UNIT: GRID_UNIT, 
    CANVAS_WIDTH: CANVAS_WIDTH,
    CANVAS_HEIGHT: CANVAS_HEIGHT,
    X_SHIFT: X_SHIFT,
    Y_SHIFT: Y_SHIFT,
    FRET_SPACING_WIDTH: FRET_SPACING_WIDTH,
    DEFAULT_NUM_FRETS: DEFAULT_NUM_FRETS,
    STRING_SPACING_WIDTH: STRING_SPACING_WIDTH,
    STRING_LENGTH: STRING_LENGTH,
    BASE_CIRCLE_RADIUS: BASE_CIRCLE_RADIUS,
    X:x
    
};

