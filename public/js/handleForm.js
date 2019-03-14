$(document).ready(() => {
    let form = $('#chord-svg-form');
    form.submit((e) => {
        e.preventDefault();

        let chordSvgPostData = {
            chordName: "",
            stringFretInfo: {

            },
            chordStartFret: 0,
            barreIndicator: [
                
            ]
        }

        $("div[id^=barre-group-row]").each((i, el) => {
            let row = $(el);
            let selectElem = row.find('select');
            
            let fromStringVal = $(selectElem[0]).val();
            let toStringVal = $(selectElem[1]).val();
            let relFretVal = $(selectElem[2]).val();
            let fingerVal = $(selectElem[3]).val();

            console.log('from: ' + fromStringVal);
            console.log('to: ' + toStringVal);
            console.log('rf: ' + relFretVal);
            console.log('fv: ' + fingerVal);

            let barreEmpty = checkBarreEmpty(fromStringVal, toStringVal, relFretVal, fingerVal);

            
            if (!barreEmpty) {
                let barreValid = validateBarreIndicatorInput(fromStringVal, toStringVal, relFretVal, fingerVal);
                
                if (barreValid) {
                    chordSvgPostData.barreIndicator.push({
                        fromString: fromStringVal,
                        toString: toStringVal,
                        relativeFret: relFretVal,
                        fingerNumber: fingerVal
                    });
                }
            }

        });



        // $.ajax({
        //     contentType: "application/json; charset=utf-8",
        //     type: "POST",
        //     url: "/p", //form.attr('action'),
        //     dataType:'json',
        //     data: JSON.stringify(chordSvgPostData),
        //     success:function(resData) {
        //         console.log("Submission successful");
        //         console.log(resData);
        //     },
        //     error: function (resData) {
        //         console.log("Submission ERROR");
        //         console.log(resData);
        //     }
        // });


    });

    function checkBarreEmpty(fromStringVal, toStringVal, relFretVal, fingerVal) {
        return (fromStringVal == '' && toStringVal == '' && relFretVal == '' && fingerVal == '');
    }
    function validateBarreIndicatorInput(fromStringVal, toStringVal, relFretVal, fingerVal) {
        if (fromStringVal !== '' && toString !== '') {
            fromStringVal = parseInt(fromStringVal);
            toStringVal = parseInt(toStringVal);

            if (fromStringVal <= toStringVal) {
                console.log('from string must be greater than to string');
                return false;
            }

            if (relFretVal == '') {
                console.log('rel fret must be specified with from string and to string');
                return false;
            }

            return true;
        }

        return false;
    }

});