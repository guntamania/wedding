var counterElement = document.getElementById("counter");

// Get a reference to the database service
var database = firebase.database();

database.ref('/hee/count').once('value').then(function(snapshot) {
    var val = snapshot.val() == null ? 0 : snapshot.val();
    counterElement.innerHTML = "合計: "+val + "へぇ";
});

var sumOfHee = firebase.database().ref('/hee/count');
sumOfHee.on('value', function(snapshot) {
    var val = snapshot.val() == null ? 0 : snapshot.val();
    counterElement.innerHTML = "合計:" + val + "へぇ";
});

// sends reset
function resetAllHees() {
    // increase remote value
    database.ref('hee/reset').once('value').then(
	function(snapshot) {
	    firebase.database().ref('/hee').set({
		reset: (snapshot.val() + 1)
	    });
	}
    );

    firebase.database().ref('/hee').set({
	count: 0
    });
}

function addHee() {
    if (hees > 20) {
	console.log("return");
	return;
    }
    // increase local value
    hees++;
    updateView();
    // increase remote value
    database.ref('hee/count').once('value').then(
	function(snapshot) {
	    firebase.database().ref('/hee').set({
		count: (snapshot.val() + 1)
	    });
	}
    );
}

