$(function () {
    var wavesurfer = WaveSurfer.create({
        container: 'div#waveform',
        barWidth: 1
    });

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    $('.btn-play').on('click', (event) => {
        console.log('loading audio', event.target.dataset.filename);
        $.get(window.location.origin + '/track?filename=' + event.target.dataset.filename, (response) => {
            console.log(response);
            wavesurfer.load(audioUrl);
        });
    })
});