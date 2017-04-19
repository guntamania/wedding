var audio;
window.onload = function () {
    audio = new Audio('nc69286.mp3');
};
function sound() {

    audio.pause();
    audio.currentTime = 0;
    audio.play();

    addHee();
}