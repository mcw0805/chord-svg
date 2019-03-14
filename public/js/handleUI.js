$(document).ready(() => {

    // handling string info
    $("select[id^='fr-s']").each((i, el) => {
        let elem = $(el);
        let elId = elem.attr('id');

        elem.on('change', () => {
            let currVal = elem.val();

            if (currVal == 'x' || currVal == '0' || currVal == '') {
                let fiSelect = $(`#fi-s${elId.slice(-1)}`);
                fiSelect.val("");
            }
        })

    });
    
});

var barreInputNum = 0;
function controlChordStartFretInput() {
    let chordStartFretInput = $('#chord-start-fret');
    let fretNum = $('#chord-start-fret').val();

    if (isNaN(parseInt(fretNum))) {
        chordStartFretInput.val(0);
        return;
    }

    if (fretNum < 0) {
        chordStartFretInput.val(0);
    } else if (fretNum > 22) {
        chordStartFretInput.val(22);
    }
}

function addBarreInputRow() {
    let currNumBarreGroupElements = getNumElements();
    if (currNumBarreGroupElements < 5) {
        barreInputNum++;

        let rowElementId = `barre-group-row-${barreInputNum}`;
        
        let html = $(`
        <div class="form-group row" id="${rowElementId}">
            <div class="col-2"></div>

            <div class="input-group col-8" >
                <div class="input-group-prepend select-label" >
                    <span class="input-group-text select-label-text dropdown-label barre-label">From<br>String</span>
                    <div class="input-group-text select-div">
                        <select class="option-dropdown barre-label" name="barreIndicator[${barreInputNum}][fromString]">
                            <option value="">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="5">6</option>
                        </select>
                    </div>
                </div>

                <div class="input-group-prepend select-label">
                    <span class="input-group-text select-label-text dropdown-label barre-label">To<br>String</span>
                    <div class="input-group-text select-div">
                        <select class="option-dropdown barre-label" name="barreIndicator[${barreInputNum}][toString]">
                            <option value="">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="5">6</option>
                        </select>
                    </div>
                </div>

                <div class="input-group-prepend select-label">
                    <span class="input-group-text select-label-text dropdown-label barre-label">Relative<br>Fret</span>
                    <div class="input-group-text select-div">
                        <select class="option-dropdown barre-label" name="barreIndicator[${barreInputNum}][relativeFret]">
                                <option value="">None</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                    </div>
                </div>

                <div class="input-group-prepend select-label">
                    <span class="input-group-text select-label-text dropdown-label barre-label">Finger<br>Number</span>
                    <div class="input-group-text select-div">
                        <select class="option-dropdown barre-label" name="barreIndicator[${barreInputNum}][fingerNumber]">
                            <option value="">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <div class="barre-row-remove">
                    <a href="javascript:void(0);" onclick="removeBarreInput('${rowElementId}')">Remove</a>
                </div>
                
            </div>
        </div>
        `);

       html.appendTo($('#barre-group'));
    }
}

function removeBarreInput(barreRowElementId) {
    let toRemoveRowElement = $(`#${barreRowElementId}`);
    toRemoveRowElement.remove();
}

function getNumElements() {
    return $('#barre-group').children().length;
}