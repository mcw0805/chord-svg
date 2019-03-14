const ChordSvg = require('../../chord-svg-r/ChordSvg');
const constants = require('../../chord-svg-r/ChordSvgMetricSettings');
const Raphael = require('raphael');

window.onload = () => {
    //let paper = Raphael(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
    let c = new ChordSvg(Raphael);
    c.drawText(50, 50, "hello");
    c.showGrid();
}


