const express = require('express');
const router = express.Router();
const Place = require("../models/place");

router.get("/", (req,res, next) => {
  res.render('index');
})

router.get("/places", (req, res, next)=>{
  
  // Place.find()
  // .then(data => {
  //   res.send(data)
  // })
  // .catch(err => {
  //   res.send(err)
  // })
});


router.post("/places", (req, res, next)=>{
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


//   Place.create({
//     name,
//     type,
//     location
//   })
//   .then(() => {
//     res.send(`${name} created successfully` )
//   })
//   .catch(err => {
//     res.send(err)
//   })
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


router.put("/places/:id", (req, res, next)=>{
  const {id, name, type} = req.body;
  Place.findByIdAndUpdate(id, {name, type})
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