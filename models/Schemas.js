const {Schema, model, Mongoose} = require("mongoose");
const mongoose = require('../DB/conn');

const ownerSchema = new Schema({
    name: String,
    dog: {type: mongoose.Types.ObjectId, ref: "Dog"}
});

const dogSchema = new Schema({
    name: String,
    owner: {type: mongoose.Types.ObjectId, ref: "Owner"}
});

const Owner = model("Owner", ownerSchema);
const Dog = model("Dog", dogSchema);

module.exports = {Owner, Dog};