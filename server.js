var express = require('express');
var path = require('path');

var PORT = process.env.PORT || 8082;

/** Mongoose connection */
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/fitness');

var app = express();


app.use(express.static(__dirname +"/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add", function(req, res) {
    console.log("request came");
    console.log(req.body);
});




app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
