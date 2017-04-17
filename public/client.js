
var heeElement = document.getElementById("hee_button");
var myHeeElement = document.getElementById("my_hee");
var hees = 0;
var reset_flag = 0;
var refToCount = null;

// for debug
var counterElement = document.getElementById("counter");

// Get a reference to the database service
var database = firebase? firebase.database():null;

if(database) {
    database.ref('/hee/counts').once('value').then(function(snapshot) {
	console.log('snapshot'+snapshot.val());
	var total = sum(snapshot.val());
	counterElement.innerHTML = "合計:" + total + "へぇ";
    });
}

function resetCount() {
    refToCount = null;
    hees = 0;
    updateView();
}

function sum(arr) {
    var sum = 0;
    console.log('in log' + JSON.stringify(arr));
    for(var key in arr) {
	sum += arr[key]['count_for_user'];
    }
    return sum;
}

// for Debug
if (database) {
    var globalCount = database.ref('/hee/counts');
    globalCount.on('value', function(snapshot) {
	console.log('snapshot'+snapshot.val());
	var total = sum(snapshot.val());
	counterElement.innerHTML = "合計:" + total + "へぇ";
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
    if (!refToCount) {
	refToCount = database.ref('hee/counts').push();
    }
    // increase local value
    hees++;
    updateView();
    // increase remote value
    if(database) {
	refToCount.set({
	    "count_for_user": hees
	});
    }
}

heeElement.addEventListener('touchstart', function(event) {
    console.log("touch_start");
//    sound();
//    addHee();
}, false);
