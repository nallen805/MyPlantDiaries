var mongojs = require('mongojs');
var databaseURL = "localhost/plantdiaries";
var db = mongojs(databaseURL);

//Validate admin user
exports.verifyAdmin=function(username, password, response)
{
    db.adminUsers.find({"username":username, "password":password}, function(error, adminUsers)
    {
        if(error || !adminUsers)
        {
            console.log('Invalid user');
            response.render('error', {title:'Error'});
        }
        else if(adminUsers.length == 0)
        {
            console.log('Invalid user');
            response.render('home', {title:'Invalid', message:'Invalid User'});
        }
        else
        {
            console.log('Admin verified');
            response.render('adminWelcome', {title:'Welcome'});
        }
    })
}

//View all plants
exports.viewAll=function(response)
{
    db.plants.find({}, function(error, plants)
    {
        if(error || !plants)
        {
            console.log('Error');
            response.render('error', {title:'Error'});
        }
        else
        {
            console.log('Plants found');
            response.render('viewAll', {plant:plants, title:'View All', message:'View All Plants'});
        }
    });
}

//Add a plant
exports.addPlant=function(plantName, plantNickname, plantLight, repotSch, /** nextRepot, */ waterSch, response)
{
    db.plants.save({"plantName":plantName, "plantNickname":plantNickname, "plantLight":plantLight, "repotSch":repotSch, /** "nextRepot":nextRepot, */ "waterSch":waterSch}, function(error, saved)
    {
        if(error || !saved)
        {
            console.log('Error');
            response.render('error', {title:'Error'});
        }
        else
        {   response.render('addPlant', {title:'Add Plant', message:'Plant added successfully'});}
    });
}

//Edit a plant
exports.showAllToUpdate=function(response)
{
    db.plants.find({}, function(error, plants)
    {
        if(error || !plants)
        {
            console.log('Error');
            response.render('error', {title:'Error'});
        }
        else 
        {
            console.log('Plants found');
            response.render('updatePlant', {plant:plants, title:'Update Plant', message:'Update Plant'});
        }
    });
}

//Updating one plant
exports.updateThisPlant=function(plantToUpdate, newNickname, response)
{
    db.plants.update({"plantName":plantToUpdate},{$set:{"plantNickname":newNickname}}, function(error, updated)
    {
        if(error || !updated)
        {
            console.log('Error updating plant');
            response.render('error', {title:'Error', message:'Error'});
        }
        else
        {
            console.log('Plant updated successfully');
            response.render('updatedPlant', {title:'Updated', message:'Updated Sucessfully'});
        }
    })
}

//Remove a plant
exports.showAllToRemove=function(response)
{
    db.plants.find({}, function(error, plants)
    {
        if(error || !plants)
        {   response.render('error', {title:'Error'});  }
        else
        {   response.render('removePlant', {plant:plants, title:'Remove', message:'Remove Plant'}); }
    });
}

//Removing plant
exports.removePlant=function(removePlant, response)
{
    db.plants.remove({"plantName":removePlant}, function(error, deleted)
    {
        if(error || !deleted)
        {   response.render('error', {title:'Error', message:'Error'}); }
        else
        {   response.render('removedPlant', {title:'Plant Removed', message:'Plant removed'});  }
    });
}