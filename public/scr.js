var counterElement = document.getElementById("counter");
var heeElement = document.getElementById("hee_button");
var myHeeElement = document.getElementById("my_hee");
var hees;
var reset_flag = 0;

// Get a reference to the database service
var database = firebase.database();

firebase.database().ref('/hee/count').once('value').then(function(snapshot) {
    var val = snapshot.val() == null ? 0 : snapshot.val();
    counterElement.innerHTML = "合計: "+val + "へぇ";
});

function resetCount() {
    hees = 0;
    updateView();
}

var starCountRef = firebase.database().ref('/hee/count');
starCountRef.on('value', function(snapshot) {
    var val = snapshot.val() == null ? 0 : snapshot.val();
    counterElement.innerHTML = "合計:" + val + "へぇ";
});

// callbacks to receive from MC
var resetFlag = firebase.database().ref('/hee/reset');
resetFlag.on('value', function(snapshot) {
    if(reset_flag != snapshot.val()) {
	console.log("snap"+snapshot.val() + "reset_flag" + reset_flag );
	reset_flag = snapshot.val();
	resetCount();
    }
});

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

function updateView() {
    if(myHeeElement) {
	myHeeElement.innerHTML = hees + "へぇ";
    }
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

heeElement.addEventListener('touchstart', function(event) {
    console.log("touch_start");
    sound();
    addHee();
}, false);
