const express =  require('express');
const Joi = require('joi');
const Car = require('../models/Car');
const router = express.Router();

// displaying all the cars available in the store
router.get('/cars' , async(req,res)=>{
    try{
        let products = await Car.find({});
        let username = req.user.username;
        res.render('cars/index' , {products});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
    
})


// adding a form for a new car
router.get('/cars/new' , (req,res)=>{
    try{
        res.render('cars/new');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// actually adding a new car entry in the database 
router.post('/cars' , async (req,res)=>{
    try{
        let {company , model , year , mileage} = req.body;
        

        await Car.Create({company , model , year , mileage});
        req.flash('success' , 'Car added successfully');
        res.redirect('/cars');
    }

    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// route for showing the details of a cars
router.get('/cars/:id' , async(req,res)=>{
    try{

        let {id} = req.params;
        let foundProduct = await Car.findById(id);
        res.render('cars/show' , {foundProduct , msg:req.flash('msg')});
    }

    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})

// route for editing the car so we need form for it
router.get('/cars/:id/edit' , async(req,res)=>{
    try{

        let {id} = req.params;
        let foundProduct = await Car.findById(id);
        res.render('cars/edit' , {foundProduct});
        
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// changing the original edits in the database made in the editform 
router.patch('/cars/:id' ,  async(req,res)=>{
    try{

        let {id} = req.params;
        let {company , model , year , mileage} = req.body;
        await Car.findByIdAndUpdate(id , {company , model , year , mileage});
        req.flash('success' , 'Car edited successfully');
        res.redirect(`/cars/${id}`)
    }

    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})





module.exports = router;
