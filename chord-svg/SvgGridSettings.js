const LEFT_MARGIN = 3;
const RIGHT_MARGIN = 3;
const TOP_MARGIN = 2.5;
const BOTTOM_MARGIN = 3;

const X_SHIFT_UNIT = 3;
const Y_SHIFT_UNIT = 2.5;

const FRET_SPACING_UNIT = 2.5;
const STRING_SPACING_UNIT = 2;

const BASE_CIRCLE_RADIUS_UNIT = 0.5;

const calcCanvasWidth = (gridUnit, numStrings) => {
    // was orignially gridUnit * 14
    return (LEFT_MARGIN * gridUnit) 
            + (STRING_SPACING_UNIT * gridUnit * (numStrings - 1))
            + (RIGHT_MARGIN * gridUnit);
}

const calcCanvasHeight = (gridUnit, numFrets) => {
    // was orignially gridUnit * 20
    return (TOP_MARGIN * gridUnit) 
            + (FRET_SPACING_UNIT * gridUnit * numFrets)
            + (BOTTOM_MARGIN * gridUnit);
}

const canvWidth = (gridUnit, numStrings) => {
    return (LEFT_RIGHT_MARGIN * gridUnit * 2) + (gridUnit * numStrings);
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
    return calcStringSpacingWidth(gridUnit) * (numStrings - 1);
}

const calcFretwireLength = (gridUnit, numStrings) => {
    return calcNeckWidth(gridUnit, numStrings);
}

module.exports = {
    calcCanvasWidth,
    calcCanvasHeight,
    calcXShift,
    calcYShift,
    calcFretSpacingWidth,
    calcStringSpacingWidth,
    calcBaseCircleRadius,
    calcStringLength,
    calcNeckWidth,
    calcFretwireLength
}