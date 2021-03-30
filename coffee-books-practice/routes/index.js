const express = require('express');
const router = express.Router();
const Place = require("../models/place");

router.get("/", (req,res, next) => {
  res.render('index')
});

router.get("/places", (req, res, next)=>{
  Place.find()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
});

router.get("/places/:id", (req, res, next)=>{
  const place_id = req.params.id;
  Place.findById(place_id)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
});


router.post("/places", (req, res, next)=>{
  console.log(req.body);

  const {name, type, latitude, longitude} = req.body;
  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  };
  const newPlace = new Place({
    name,
    type,
    location
  });
  newPlace.save(err => {
    if(err){
      next(err)
    } else {
      console.log("successfully posted")
    }
  })
});


router.post("/places/edit/:id", (req, res, next)=>{
  const id = req.params.id;
  console.log(req.body)
  const {name, type, latitude, longitude} = req.body;
  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }
  
  Place.findByIdAndUpdate(id, {
    name,
    type,
    location
  }, {new: true})
  .then(data => {
    res.send(`updated successfully: ${data}`)
  })
  .catch(err => {
    res.send(err)
  })
});


router.delete("/places/:id", (req, res, next)=>{
  const place_id = req.params.id;
  Place.findByIdAndDelete(place_id)
  .then(() => {
    res.send(`deleted successfully`)
  })
  .catch(err => {
    res.send(err)
  })
});


module.exports = router;