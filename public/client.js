
var heeElement = document.getElementById("hee_button");
var myHeeElement = document.getElementById("my_hee");
var hees = 0;
var reset_flag = 0;

// for debug
var counterElement = document.getElementById("counter");

// Get a reference to the database service
var database = firebase? firebase.database():null;

database.ref('/hee/count').once('value').then(function(snapshot) {
    var val = snapshot.val() == null ? 0 : snapshot.val();
    counterElement.innerHTML = "合計: "+val + "へぇ";
});

function resetCount() {
    hees = 0;
    updateView();
}

// for Debug
if (database) {
    var globalCount = database.ref('/hee/count');
    globalCount.on('value', function(snapshot) {
	var val = snapshot.val() == null ? 0 : snapshot.val();
	counterElement.innerHTML = "合計:" + val + "へぇ";
    });
}

// callbacks to receive from MC
if (database) {
    var resetFlag = database.ref('/hee/reset');
    resetFlag.on('value', function(snapshot) {
	if(snapshot.val() != null && reset_flag != snapshot.val()) {
	    console.log("snap"+snapshot.val() + "reset_flag" + reset_flag );
	    reset_flag = snapshot.val();
	    resetCount();
	}
    });
}

function updateView() {
    if(myHeeElement) {
	myHeeElement.innerHTML = hees + "へぇ";
    }
}

function addHee() {
    if (hees >= 20) {
	console.log("return");
	return;
    }
    // increase local value
    hees++;
    updateView();
    // increase remote value
    if(database) {
	database.ref('hee/count').once('value').then(
	    function(snapshot) {
		firebase.database().ref('/hee').set({
		    count: (snapshot.val() + 1)
		});
	    }
	);
    }
}

heeElement.addEventListener('touchstart', function(event) {
    console.log("touch_start");
//    sound();
//    addHee();
}, false);
