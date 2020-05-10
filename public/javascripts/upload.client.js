function handleFileSelect() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    var input = document.getElementById('fileInput');
    if (!input) {
        alert("Could not find the fileInput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        var file = input.files[0];
        var fr = new FileReader();
        fr.onload = (event) => {
            console.log(event);
            console.log($('#fileInput'));
            $.post('/upload/send', { data: event.target.result, name: $('#fileInput').get(0).files[0].name },
                function (err) {
                    if (err) {
                        console.error("Could not upload file : " + err);
                    }
                });
        };
        //fr.readAsText(file);
        fr.readAsBinaryString(file); //as bit work with base64 for example upload to server
        //fr.readAsDataURL(file);
    }
}