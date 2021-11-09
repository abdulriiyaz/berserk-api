//create a mongoose schema for the character
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

Schema.Character = new Schema({
    name: String,
    desc: String,
});

//export the schema
module.exports = mongoose.model("Character", Schema.Character);
