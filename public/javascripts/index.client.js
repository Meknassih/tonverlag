$(function () {
    // Initializing
    let firstLoad = true;
    const wavesurfer = WaveSurfer.create({
        container: 'div#waveform',
        barWidth: 3,
        responsive: true,
        progressColor: '#007bff',
        barGap: 2,
        cursorColor: '#d2d9e1',
        skipLength: 10
    });

    wavesurfer.load(window.location.origin + '/track?filename=' +
        $('.btn-play').get(0).dataset.filename);
    $('.player .artist-and-title').html($('.btn-play').get(0).dataset.displayname);

    // Event handlers
    wavesurfer.on('ready', function () {
        // Ignore playing at first load because it is done automatically when accessing the page
        if (firstLoad)
            firstLoad = false;
        else
            wavesurfer.play();

        $('.player .duration').html(elapsedVsTotalTimeString(0, wavesurfer.getDuration()));
        $('.player .btn-play').removeAttr('disabled');
        $('.player .loading').html('');
    });

    wavesurfer.on('loading', function (progress) {
        $('.player .btn-play').attr('disabled', true);
        $('.player .loading').html(`<div class="text-light text-center">Loading: ${progress}</div>`);
    });

    wavesurfer.on('audioprocess', function () {
        $('.player .duration').html(elapsedVsTotalTimeString(wavesurfer.getCurrentTime(), wavesurfer.getDuration()));
    });

    $('.card-track .btn-play').on('click', (event) => {
        console.log('loading audio', event.target.dataset.filename);
        wavesurfer.load(window.location.origin + '/track?filename=' + event.target.dataset.filename);
        $('.player .artist-and-title').html(event.target.dataset.displayname);
    });

    $('.controls > .btn-play').on('click', () => {
        wavesurfer.playPause();
    });
});

function secondsToTime(seconds) {
    return new Date(1000 * seconds).toISOString().substr(14, 5);
}

function elapsedVsTotalTimeString(elapsedSeconds, totalSeconds) {
    return `${secondsToTime(elapsedSeconds)} — ${secondsToTime(totalSeconds)}`;
}