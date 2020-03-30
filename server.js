var express = require("express");
var path = require("path");

var PORT = process.env.PORT || 8082;

/** Mongoose connection */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {
  useNewUrlParser: true
});

const Activity = require("./models/Fitness");

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Adding new activity
app.post("/add", function(req, res) {
  var data = req.body;
  var newEntry = new Activity({
    name: data.activity,
    calories: data.calories,
    timestamp: data.timestamp
  });
  newEntry.save(function(err, entry) {
    if (err) return console.error(err);
    console.log("Successfully saved the activity");
  });
});

//getting activities for requested date
app.get("/activities", function(req, res) {
  Activity.find({ timestamp: req.query.date }, function(err, data) {
    if (err) res.send(err);
    res.json(data);
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
