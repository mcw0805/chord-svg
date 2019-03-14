const {
    calcCanvasWidth,
    calcCanvasHeight,
    calcXShift,
    calcYShift,
    calcFretSpacingWidth,
    calcStringSpacingWidth,
    calcBaseCircleRadius,
    calcStringLength
} = require('./SvgGridSettings');

const GRID_UNIT = 18;
const DEFAULT_NUM_FRETS = 5;
const DEFAULT_NUM_STRINGS = 6;

const CANVAS_WIDTH = calcCanvasWidth(GRID_UNIT, DEFAULT_NUM_STRINGS);
const CANVAS_HEIGHT = calcCanvasHeight(GRID_UNIT, DEFAULT_NUM_FRETS);

const X_SHIFT = calcXShift(GRID_UNIT);
const Y_SHIFT = calcYShift(GRID_UNIT);

// spacing between each fret
const FRET_SPACING_WIDTH = calcFretSpacingWidth(GRID_UNIT);

// spacing between each string
const STRING_SPACING_WIDTH = calcStringSpacingWidth(GRID_UNIT);

// length of the string across all displayed fretboard
const STRING_LENGTH = calcStringLength(GRID_UNIT, DEFAULT_NUM_FRETS); // length of string

const BASE_CIRCLE_RADIUS = calcBaseCircleRadius(GRID_UNIT);

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
    BASE_CIRCLE_RADIUS: BASE_CIRCLE_RADIUS
};

