let formData;
let wavesurfer;
$(() => {
    $('#fileInput').val('');
});

function onFileChange(event) {
    $('#btnLoad').attr('disabled', true);
    $('#btnLoad').html(`<svg class="bi bi-clock" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
    <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
  </svg> Loading`);
    if (wavesurfer)
        wavesurfer.destroy();
    wavesurfer = WaveSurfer.create({
        container: 'div#waveform',
        barWidth: 3,
        responsive: true,
        progressColor: '#007bff',
        barGap: 2,
        cursorColor: '#d2d9e1'
    });

    wavesurfer.on('ready', function () {
        // Timeout needed because of Wafesurfer bug
        setTimeout(() => {
            wavesurfer.exportImage('image/png', 1, 'blob').then((imageBlobArray) => {
                const imageBlob = imageBlobArray[0];
                // BEGIN DEBUG
                /* console.debug(imageBlob);
                const imageUrl = URL.createObjectURL(imageBlob);
                console.debug('imgUrl:' + imageUrl);
                $('#waveform-export').get(0).src = imageUrl; */
                // END DEBUG
                formData = new FormData();
                formData.append('audioFile', $('#fileInput').get(0).files[0], $('#fileInput').get(0).files[0].name);
                formData.append('imageFile', imageBlob, `${Date.now()}_${$('#fileInput').get(0).files[0].name}.png`);
                $('#btnLoad').removeAttr('disabled');
                $('#btnLoad').html(`<svg class="bi bi-cloud-upload" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z"/> <path fill-rule="evenodd" d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z"/> <path fill-rule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"/> </svg> Upload`);
            });
        }, 200)

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
            $('#notification').html(data);
        },
        error: (jqXHR, textStatus, error) => {
            console.log(jqXHR, textStatus, error);
            if ([400, 503].includes(jqXHR.status))
                $('#notification').html(jqXHR.responseText);
            else
                $('#notification').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                An unexpected error happened during upload: ${error}.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>`);
        }
    });
}