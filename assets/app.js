
// this connects it to the specific firebase project and database we are working with. 
//this needs to be updated with a fresh project info
var firebaseConfig = {
  apiKey: "AIzaSyCLzGx5TjILIPq5Pj8W-WhN90mi_YfhCPk",
  authDomain: "project3kungfu.firebaseapp.com",
  databaseURL: "https://project3kungfu.firebaseio.com",
  projectId: "project3kungfu",
  storageBucket: "",
  messagingSenderId: "80261254147",
  appId: "1:80261254147:web:bfe67c9f940735bb"
};

firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database.
var database = firebase.database();



// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trndestination = $("#destination-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trnfrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newtrn = {
    name: trnName,
    destination: trndestination,
    start: trnStart,
    frequency: trnfrequency
  };

  // Uploads train data to the database
  database.ref().push(newtrn);

  // Logs everything to console
  console.log(newtrn.name);
  console.log(newtrn.destination);
  console.log(newtrn.start);
  console.log(newtrn.frequency);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trndestination = childSnapshot.val().destination;
  var trnStart = childSnapshot.val().start;
  var trnfrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trnName);
  console.log(trndestination);
  console.log(trnStart);
  console.log(trnfrequency);

  var trnStartPretty = moment(trnStart, "HH:mm").subtract(1, "years");

  // Calculate 
  var duration = moment().diff(moment(trnStartPretty), "minutes");
  console.log(duration);

  var trnModulo = duration % trnfrequency;
  console.log(trnModulo);

  var minsTillNext = trnfrequency - trnModulo;
  console.log(minsTillNext);

  var nexttrn = moment ().add(minsTillNext, "minutes");
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(snapshot.val().name),
    $("<td>").text(snapshot.val().destination),
    $("<td>").text(snapshot.val().frequency),
    $("<td>").text(nexttrn.format("HH:mm")),
    $("<td>").text(minsTillNext),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttrnt we use meets this test case
