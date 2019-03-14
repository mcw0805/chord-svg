const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const d3 = require('d3');

const ChordSvgMetricSettings = require('./DefaultChordSvgMetricSettings');
const ChordSvgStyleSettings = require('./ChordSvgStyleSettings');
const GuitarInstrumentSettings = require('./GuitarInstrumentSettings');

const { 
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
} = require('./SvgGridSettings');

class ChordSvg {
    constructor(instrumentSettings, styles, 
                gridUnit=ChordSvgMetricSettings.GRID_UNIT, 
                numFrets=ChordSvgMetricSettings.DEFAULT_NUM_FRETS) {
        
        this.instrumentSettings = (!instrumentSettings || instrumentSettings === undefined) ? GuitarInstrumentSettings : instrumentSettings;
        this.styles = (!styles || styles === undefined) ? ChordSvgStyleSettings : styles;

        this.numStrings = this.instrumentSettings.NUM_STRINGS;
        this.tuning = this.instrumentSettings.TUNING;
        this.numFrets = numFrets;

        this.gridUnit = gridUnit;
        this.canvasWidth = calcCanvasWidth(this.gridUnit, this.numStrings);
        this.canvasHeight = calcCanvasHeight(this.gridUnit, this.numFrets);
        this.xShift = calcXShift(this.gridUnit);
        this.yShift = calcYShift(this.gridUnit);
        this.baseCircleRadius = calcBaseCircleRadius(this.gridUnit);

        this.stringSpacingWidth = calcStringSpacingWidth(this.gridUnit);
        this.fretSpacingWidth = calcFretSpacingWidth(this.gridUnit);

        this.stringLength = calcStringLength(this.gridUnit, this.numFrets);

        // depends on the number of strings
        this.neckWidth = this.fretwireLength = calcNeckWidth(this.gridUnit, this.numStrings);

        this.chordName = "";
        this.chordStartFret = 0;
        this.stringFretInfo = {};
        this.barreIndicator = [];
        this.drawTuning = true;

        const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        this.body = d3.select(fakeDom.window.document).select('body');
        this.svgContainer = this.body.append('div').attr('class', 'container')
                                .append('svg')
                                .attr('width', this.canvasWidth)
                                .attr('height', this.canvasHeight)
                                .attr('xmlns', 'http://www.w3.org/2000/svg')
                                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    }

    drawFretBase() {
        this.svgContainer.append('rect')
                        .attr('x', this.xShift)
                        .attr('y', this.yShift)
                        .attr('width', this.neckWidth)
                        .attr('height', this.stringLength)
                        .attr('stroke', this.styles.FRETBOARD_BASE_COLOR)
                        .attr('fill', this.styles.FRETBOARD_BASE_COLOR);
    }

    drawNut() {
        this.svgContainer.append('rect')
                        .attr('x', this.xShift)
                        .attr('y', this.yShift - this.gridUnit / 4)
                        .attr('width', this.neckWidth)
                        .attr('height', this.gridUnit / 4)
                        .attr('r', 1)
                        .attr('stroke', this.styles.NUT_OUTLINE_COLOR)
                        .attr('fill', this.styles.NUT_COLOR);
 
    }

    drawStrings() {
        for (let i = 0; i < this.numStrings; i++) {
            this.drawLine(this.stringSpacingWidth * i + this.xShift,
                            this.yShift,
                            this.stringSpacingWidth * i + this.xShift,
                            this.stringLength + this.yShift);
        }
    }

    drawFretwires() {
        const strokeWidth = this.styles.FRETWIRE_STROKE_WIDTH;

        for (let i = 0; i < this.numFrets + 1; i++) {
            if (i == 0) {
                this.drawLine(this.xShift,
                                this.fretSpacingWidth * i + this.yShift + strokeWidth / 2,
                                this.fretwireLength + this.xShift,
                                this.fretSpacingWidth * i + this.yShift + strokeWidth / 2);

            } else if (i == this.numFrets) {
                this.drawLine(this.xShift,
                                this.fretSpacingWidth * i + this.yShift - strokeWidth / 2,
                                this.fretwireLength + this.xShift,
                                this.fretSpacingWidth * i + this.yShift - strokeWidth / 2);

            } else {
                this.drawLine(this.xShift,
                                this.fretSpacingWidth * i + this.yShift,
                                this.fretwireLength + this.xShift,
                                this.fretSpacingWidth * i + this.yShift);
            }
            
        }        
    }

    drawBarre(fretNumInImg, startStringNumber, endStringNumber, radius, fingeringNumber="", 
                fingerNumTextSize=(this.gridUnit * 0.8), 
                strokeColor=this.styles.FINGERING_CIRCLE_STROKE_COLOR,
                fillColor=this.styles.FINGERING_CIRCLE_FILL_COLOR) {
        
        const startPathX = this.xShift + (this.numStrings - startStringNumber) * this.stringSpacingWidth;
        const startPathY = this.yShift + (this.fretSpacingWidth * fretNumInImg) 
                            - (this.fretSpacingWidth / 2) - radius;
        const horizLineLength = this.stringSpacingWidth * (startStringNumber - endStringNumber);

        const pathLine = `M ${startPathX}, ${startPathY}
                            a1,1 0 0,0 0,${radius * 2} 
                            h${horizLineLength}
                            a1,1 0 0,0 0,${-radius * 2}
                            z
                            `
        this.svgContainer.append('path')
                        .attr('d', pathLine)
                        .attr('stroke', strokeColor)
                        .attr('fill', fillColor);

        if (fingeringNumber !== "" && typeof fingeringNumber == 'number') {
            const textPosX = (startPathX + (startPathX + horizLineLength)) / 2;
            const textPosY = startPathY + radius;
            this.drawText(textPosX, textPosY, fingeringNumber.toString(), 
                            this.styles.FINGERING_NUMBER_TEXT_COLOR,
                            fingerNumTextSize);
        }
        
    }

    drawStringTuning() {
        for (let i = 0; i < this.tuning.length; i++) {
            this.drawText(this.xShift + this.stringSpacingWidth * i,
                        this.stringLength + this.yShift + this.gridUnit * 1.5,
                        this.tuning[i],
                        this.styles.STRING_TUNING_TEXT_COLOR);
        }
    }

    drawChordStartFretNumber(fretNum) {
        this.drawText(this.xShift - this.gridUnit * 1.5,
                        this.yShift + this.fretSpacingWidth / 2,
                        fretNum.toString(),
                        this.styles.CHORD_START_FRET_TEXT_COLOR);
    }

    drawMute(stringNum) {
        this.drawText(this.xShift + (this.numStrings - stringNum) * this.stringSpacingWidth,
                        this.yShift - this.gridUnit,
                        "X",
                        this.styles.MUTE_SYMBOL_TEXT_COLOR);
    }

    drawOpenStringCircle(stringNum, radius, 
                        strokeColor=this.styles.OPEN_STRING_CIRCLE_STROKE_COLOR, 
                        fillColor=this.styles.OPEN_STRING_CIRCLE_FILL_COLOR) {
        
        this.drawCircle(this.xShift + (this.numStrings - stringNum) * this.stringSpacingWidth,
                        this.yShift - this.gridUnit,
                        radius,
                        strokeColor,
                        fillColor);
    }

    drawFingerPlacementCircle(stringNum, fretNum, radius, fingeringNumber="",
                                fingerNumTextSize=(this.gridUnit * 0.8), 
                                strokeColor=this.styles.FINGERING_CIRCLE_STROKE_COLOR,
                                fillColor=this.styles.FINGERING_CIRCLE_FILL_COLOR) {

        this.drawCircle(this.xShift + (this.numStrings - stringNum) * this.stringSpacingWidth,
                        this.yShift + this.fretSpacingWidth * fretNum - this.fretSpacingWidth / 2,
                        radius, 
                        strokeColor, 
                        fillColor);
        
        if (fingeringNumber !== "" && typeof fingeringNumber == 'number') {
            this.drawText(this.xShift + (this.numStrings - stringNum) * this.stringSpacingWidth,
                            this.yShift + this.fretSpacingWidth * fretNum - this.fretSpacingWidth / 2,
                            fingeringNumber.toString(), 
                            this.styles.FINGERING_NUMBER_TEXT_COLOR,
                            fingerNumTextSize);
        }
    }

    drawCircle(cx, cy, r, 
                strokeColor=this.styles.DEFAULT_CIRCLE_STROKE_COLOR, 
                fillColor=DEFAULT_CIRCLE_FILL_COLOR) {
        this.svgContainer.append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .attr('stroke', strokeColor)
                .attr('fill', fillColor);
    }

    drawText(xPos, yPos, text, 
            textColor=this.styles.DEFAULT_TEXT_COLOR, 
            fontSize=this.gridUnit, 
            fontFamily=this.styles.DEFAULT_TEXT_FONT_FAMILY) {
        
        // color --> fill
        // outline --> stroke
        this.svgContainer.append('text')
                    .attr('x', xPos)
                    .attr('y', yPos)
                    .text(text)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'central')
                    .attr('fill', textColor)
                    .attr('font-size', fontSize)
                    .attr('font-family', fontFamily);
    }

    drawLine(x1, y1, x2, y2, 
            strokeWidth=this.styles.DEFAULT_LINE_STROKE_WIDTH, 
            strokeColor=this.styles.DEFAULT_LINE_STROKE_COLOR) {
        
        this.svgContainer.append('line')
                        .attr('x1', x1)
                        .attr('y1', y1)
                        .attr('x2', x2)
                        .attr('y2', y2)
                        .attr('stroke-width', strokeWidth)
                        .attr('stroke', strokeColor);
    }

    drawLinePath(x1, y1, x2, y2, 
                strokeWidth=this.styles.DEFAULT_LINE_STROKE_WIDTH, 
                strokeColor=this.styles.DEFAULT_LINE_STROKE_COLOR) {
        
        const pathParam = `M ${x1} ${y1} L ${x2} ${y2}`;
        this.svgContainer.append('path')
                        .attr('d', pathParam)
                        .attr('stroke-width', strokeWidth)
                        .attr('stroke', strokeColor);
    }

    showGrid() {
        // horizontal lines
        for (let i = 0; i <= Math.round(this.canvasHeight / this.gridUnit) ; i++) {
            this.drawLine(0,
                    i * this.gridUnit,
                    this.canvasWidth,
                    i * this.gridUnit,
                    1);
        }

        // vertical lines
        for (let j = 0; j <= this.canvasWidth / this.gridUnit; j++) {
            this.drawLine(j * this.gridUnit,
                            0, 
                            j * this.gridUnit,
                            this.canvasHeight,
                            1);
        }
    }

    setChord(chordData, drawTuning=true) {
        this.chordName = chordData.chordName;
        this.stringFretInfo = chordData.stringFretInfo;
        this.chordStartFret = chordData.chordStartFret;
        this.barreIndicator = chordData.barreIndicator;
        this.drawTuning = drawTuning;
    }

    drawChord() {
        this.drawFretBase();
        this.drawFretwires();
        this.drawStrings();
        

        if (this.drawTuning) {
            this.drawStringTuning();
        }

        if (this.chordStartFret <= 0) {
            this.drawNut();
        }

        if (this.chordStartFret > 0) {
            this.drawChordStartFretNumber(this.chordStartFret);
        }

        // draw finger placements of the chord
        // stringNum (key), fingeringInfo (val)
        Object.entries(this.stringFretInfo).forEach(([stringNum, fingeringInfo]) => {
            stringNum = parseInt(stringNum.slice(-1));
            if (fingeringInfo.fretNumber == "x") {
                this.drawMute(stringNum);
            } else if (fingeringInfo.fretNumber == 0) {
                this.drawOpenStringCircle(stringNum, this.baseCircleRadius);
            } else {
                let fretNum = fingeringInfo.fretNumber;
                let fingerNum = fingeringInfo.fingerNumber;
                if (fingerNum == "" || isNaN(parseInt(fingerNum))) {
                    fingerNum = "";
                } else {
                    fingerNum = parseInt(fingerNum);
                }

                this.drawFingerPlacementCircle(stringNum, fretNum, this.baseCircleRadius * 1.25, fingerNum);
            }

        });

        // draw barre
        this.barreIndicator.forEach((barre) => {
            
            let startString = barre.fromString;
            let endString = barre.toString;
            let fretNum = barre.relativeFret;
            let fingerNum = barre.fingerNumber;

            if (fingerNum == "" || isNaN(parseInt(fingerNum))) {
                fingerNum = "";
            } else {
                fingerNum = parseInt(fingerNum);
            }

            this.drawBarre(fretNum, startString, endString, this.baseCircleRadius * 1.25, fingerNum);

        });

        return this.body.select('.container').html();
    }

    clearContainer() {
        this.body.select('.container').remove();
        this.svgContainer = this.body.append('div').attr('class', 'container')
                                .append('svg')
                                .attr('width', this.canvasWidth)
                                .attr('height', this.canvasHeight);
    }

    setNumFrets(numFret) {
        this.numFrets = numFret;
        this.stringLength = this.numFrets * this.fretSpacingWidth;
        
        this.canvasHeight = calcCanvasHeight(this.gridUnit, this.numFrets);
        this.svgContainer.attr('height', this.canvasHeight);
    }

    changeGridUnitSize(newGridUnit) {
        this.gridUnit = newGridUnit;

        // need to recalculate all the constants

        this.canvasWidth = calcCanvasWidth(this.gridUnit, this.numStrings);
        this.canvasHeight = calcCanvasHeight(this.gridUnit, this.numFrets);

        // reset svg container
        this.svgContainer = this.body.select('svg').attr('width', this.canvasWidth).attr('height', this.canvasHeight);

        this.xShift = calcXShift(this.gridUnit);
        this.yShift = calcYShift(this.gridUnit);

        this.baseCircleRadius = calcBaseCircleRadius(this.gridUnit);

        this.fretSpacingWidth = calcFretSpacingWidth(this.gridUnit);

        this.stringLength = calcStringLength(this.gridUnit, this.numFrets);

        this.stringSpacingWidth = calcStringSpacingWidth(this.gridUnit);
        this.neckWidth = calcNeckWidth(this.gridUnit, this.numStrings); 
        this.fretwireLength = calcFretwireLength(this.gridUnit, this.numStrings); 

    }
    
}

module.exports = ChordSvg;