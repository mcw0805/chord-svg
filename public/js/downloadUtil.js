// source: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
$(document).ready(() => {
    let svgEl = $('svg')[0];
    getDownloadableImage(svgEl);

    function getDownloadableImage(svg, name) {
        if (!name || name === undefined) {
            name = 'chordImage.svg';
        }

        let serializer = new XMLSerializer();
        let svgData = serializer.serializeToString(svg);

        //add name spaces.
        if(!svgData.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            svgData = svgData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!svgData.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            svgData = svgData.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        let preface = '<?xml version="1.0" standalone="no"?>\r\n';

        let svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});

        let svgUrl = URL.createObjectURL(svgBlob);

        let downloadSvgBtn = $('#download-svg-link');
        downloadSvgBtn.attr({'href': svgUrl,
                            'download': name
                            });

    }

});