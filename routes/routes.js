//Router for My Plant Diaries
//Required modules
var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');

//Global variables
var update;

//Home page
router.get('/', function(request, response)
{
    console.log('Request for home page received');
    response.render('home', {title:'Home'});
});

//Admin welcome
router.get('/adminWelcome', function(request, response)
{
    response.render('adminWelcome', {title:'Welcome'});
}).post('/adminWelcome', function(request, response)
{
    console.log('Request for admin welcome page received');
    var username = request.body.adminUser;
    var password = request.body.adminPass;
    dbmodule.verifyAdmin(username, password, response);
});

//View all plants
router.get('/viewAll', function(request, response)
{
    console.log('View all plants request received');
    dbmodule.viewAll(response);
});

//Add a plant
router.get('/addPlant', function(request, response)
{
    console.log('Request for add plant received');
    response.render('addPlant', {title:'Add Plant', message:'Add Plant'});
}).post('/addPlant', function(request, response)
{
    console.log('Adding new plant...');
    var plantName = request.body.plantName;
    var plantNickname = request.body.plantNickname;
    var plantLight = request.body.lighting;
    var repotSch = request.body.repotSch;
    //-var nextRepot = request.body.repot;
    var waterSch = request.body.waterSch;
    dbmodule.addPlant(plantName, plantNickname, plantLight, repotSch, /** nextRepot, */ waterSch, response);
});

//Update plant
router.get('/updatePlant', function(request, response)
{
    dbmodule.showAllToUpdate(response);
});

//Update and save plant
router.post('/updatedPlant', function(request, response)
{
    console.log('Saving updates');
    var plantToUpdate = request.body.update;
    var newNickname = request.body.newNickname;
    dbmodule.updateThisPlant(plantToUpdate, newNickname, response);
});

//Remove plant
router.get('/removePlant', function(request, response)
{
    dbmodule.showAllToRemove(response);
})
router.post('/removedPlant', function(request, response)
{
    var removePlant = request.body.removePlant;
    dbmodule.removePlant(removePlant, response);
});

module.exports=router;