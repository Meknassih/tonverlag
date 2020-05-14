let formData;

function onFileChange(event) {
    $('#btnLoad').attr('disabled', true);

    const wavesurfer = WaveSurfer.create({
        container: 'div#waveform',
        barWidth: 3,
        responsive: true,
        progressColor: '#007bff',
        barGap: 2,
        cursorColor: '#d2d9e1',
    });

    wavesurfer.on('ready', function () {
        wavesurfer.exportImage('image/png', 0.7, 'blob').then((imageBlobArray) => {
            const imageBlob = imageBlobArray[0];
            formData = new FormData();
            formData.append('audioFile', $('#fileInput').get(0).files[0], $('#fileInput').get(0).files[0].name);
            formData.append('imageFile', imageBlob, `${Date.now()}_${$('#fileInput').get(0).files[0].name}.png`);
            $('#btnLoad').removeAttr('disabled');
        });
    });
    wavesurfer.load(URL.createObjectURL($('#fileInput').get(0).files[0]));
}

function submitTrack(event) {
    event.preventDefault();
    event.stopPropagation();
    $.post({
        url: '/upload',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: (data, textStatus, jqXHR) => {
            // TODO: show alert
        },
        error: (jqXHR, textStatus, error) => {
            // TODO: show alert
        }
    });
}