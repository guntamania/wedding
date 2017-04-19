var audio;
window.onload = function () {

};

function sound() {
    addHee();
    var audio = document.getElementById("hee_sound");
    audio.load();
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}