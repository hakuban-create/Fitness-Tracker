const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: {type: String, required: true},
  calories: {type: String, required: true},
  timestamp: {type: String, required: true}
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
