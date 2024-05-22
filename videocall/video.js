function hasUserMedia() {
    return !!(navigator.getUserMeddia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
    )
}

if (hasUserMedia()) {
    navigator.getUserMeddia = navigator.getUserMeddia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    navigator.getUserMeddia({ video: true, audio: true }, function (stream) {
        var video = document.querySelector('video')

        video.src = window.URL.createObjectURL(stream)
    }, function (err) { })
} else {
    alert('web rtc not supported')
}