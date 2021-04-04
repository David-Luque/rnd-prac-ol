const express = require('express');
const { post } = require('./auth.routes');
const router = express.Router();
const Course = require('../models/Course.model');

function checkRole(role){
    return function(req, res, next){
        if(req.isAuthenticated() && req.user.role === role) {
            return next(); 
        } else {
            res.send({ message: "restricted access page to admins"});
        }
    }
};

//CREATE COURSE
router.post('/create-course', checkRole('TA'), (req, res) => {
    const {
    title,
    startDate,
    endDate ,
    courseImg,
    description,
    status,
    students
    } = req.body;

    const leadTeacher = req.body.leadTeacher._id;
    const ta = req.body.ta._id;

    Course.create({
        title,
        leadTeacher,
        startDate,
        endDate ,
        ta,
        courseImg,
        description,
        status,
        students
    })
    .then(() => {res.send({ mesage: "Course created successfully" })})
    .catch(err => res.send(err));
});

//GET ALL COURSES
router.get('/courses', checkRole('TA'), (req, res, next)=>{
    Course.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

//GET ONE COURSE
router.get('/courses/:id', checkRole('TA'), (req, res, next)=>{
    const course_id = req.params.id;
    Course.findById(course_id)
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

// UPDATE COURSE
router.post('/update-course/:id', checkRole('TA'), (req, res, next)=>{
    const course_id = req.params.id;
    const {
        title,
        startDate,
        endDate ,
        courseImg,
        description,
        status,
        students
    } = req.body;
    const leadTeacher = req.body.leadTeacher._id;
    const ta = req.body.ta._id;
    
    Course.findByIdAndUpdate(course_id, {
        title,
        leadTeacher,
        startDate,
        endDate ,
        ta,
        courseImg,
        description,
        status,
        students
    }, {new: true})
    .then(result => {
        res.send(result)
    })
    .catch(err => res.send(err))
});

// DELETE COURSE

router.get('/delete-course/:id', checkRole('TA'), (req, res, next)=>{
    const course_id = req.params.id;
    Course.findByIdAndDelete(course_id)
    .then(()=>{res.send({ message: "course successfully deleted" })})
    .catch(err=> res.send(err))
});

module.exports = router;