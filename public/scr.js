var counterElement = document.getElementById("counter");
var heeElement = document.getElementById("hee_button");
var hees;

// Get a reference to the database service
var database = firebase.database();

firebase.database().ref('/hee/count').once('value').then(function(snapshot) {
    //    var json = JSON.parse(snapshot.exportVal());
    hees = snapshot.val();
    console.log("hee:" + JSON.stringify(hees));
    counterElement.innerHTML = hees + "へぇ";
});

var starCountRef = firebase.database().ref('/hee/count');
starCountRef.on('value', function(snapshot) {
    updateCount(snapshot.val());
});

function updateCount(val) {
    hees = val;
    counterElement.innerHTML = hees + "へぇ";
}

function addHee() {
    hees++;
    // write this value
    firebase.database().ref('/hee').set({
	count: hees
    });
}

heeElement.addEventListener('touchstart', function(event) {
    console.log("touchstart");
    sound();
}, false);
