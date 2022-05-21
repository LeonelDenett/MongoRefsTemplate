const {Router} = require("express");
const {Owner, Dog} = require('../models/Schemas');
const router = Router();
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

router.get("/seed", async (req,res) => {
    dogs = [
        {name:"Kim"},
        {name:"Maia"},
        {name:"Jara"},
        {name:"Jimbo"},
    ]

    owners = [
        {name:"Leo"},
        {name:"Gabi"},
        {name:"Ma"},
        {name:"Pa"},
    ]

    const newDogs = await Dog.create(dogs);
    const newOwners = await Owner.create(owners);

    res.json({newDogs, newOwners})
})

router.get("/adopt/:dog/:owner", async (req, res) => {
    
    const owner = toId(req.params.owner);
    console.log(owner)
    const dog = await Dog.findById(req.params.dog)
    dog.owner = owner
    dog.save()

    // const dog = Dog.findByIdAndUpdate(req.params.dog, {owner: req.params.owner})
    res.json(dog)
});

router.get("/see", async (req,res) => {
    console.log(toId)
    const dogs = await Dog.find({}).populate({path: "owner", model:"Owner"});
    res.json(dogs)
});

module.exports = router