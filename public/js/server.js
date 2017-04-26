// Get a reference to the database service
var database = firebase.database();

//
// Callbacks from firebase
//

if (database) {
    database.ref('/hee/counts').once('value').then(function (snapshot) {
        console.log('snapshot' + snapshot.val());
        var total = sum(snapshot.val());
        var sliceTotal = ('000' + total).slice(-3);
        //$('#counter').html("合計:" + total + "へぇ");
        $('#counter').html(sliceTotal);
    });
}

if (database) {
    var globalCount = database.ref('/hee/counts');
    globalCount.on('value', function (snapshot) {
        console.log('snapshot' + snapshot.val());
        var total = sum(snapshot.val());
        var sliceTotal = ('000' + total).slice(-3);
        //$('#counter').html("合計:" + total + "へぇ");
        $('#counter').html(sliceTotal);
    });
}

//
// sends reset
//

function resetAllHees() {
    // increase remote value
    database.ref('hee/reset').once('value').then(
        function (snapshot) {
            database.ref('/hee').set({
                reset: (snapshot.val() + 1)
            });
        }
    );

    database.ref('/hee/counts').removed();
}

//
// Utilities
//

function sum(arr) {
    if (!arr) return 0;
    var sum = 0;
    console.log('in log' + JSON.stringify(arr));
    for (var key in arr) {
        sum += arr[key]['count_for_user'];
    }
    return sum;
}


