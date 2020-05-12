$(function () {
    let firstLoad = true;
    const wavesurfer = WaveSurfer.create({
        container: 'div#waveform',
        barWidth: 3,
        responsive: true,
        progressColor: '#007bff',
        backgroundColor: '#242a29',
        cursorColor: '#d2d9e1',
        skipLength: 10
    });

    wavesurfer.load(window.location.origin + '/track?filename=' + $('.btn-play').get(0).dataset.filename);

    wavesurfer.on('ready', function () {
        // Ignore first load because it is done automatically when accessing the page
        if (firstLoad)
            firstLoad = false;
        else
            wavesurfer.play();

        $('.controls > .btn-play').removeAttr('disabled');
    });

    $('.card-track .btn-play').on('click', (event) => {
        console.log('loading audio', event.target.dataset.filename);
        wavesurfer.load(window.location.origin + '/track?filename=' + event.target.dataset.filename);
    });

    $('.controls > .btn-play').on('click', () => {
        wavesurfer.playPause();
    });
});