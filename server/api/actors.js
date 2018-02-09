/**
 * @author harman
 * @description movie
 * @type type
 */

var Actor = require('../models/actor');
var Video = require('../models/video');
var Category = require('../models/category');
var SubCategory = require('../models/subcategory');
var ObjectID = require('mongodb').ObjectID;
var limit = 4;
// Posts API



module.exports = function(apiRouter){
	
	
	apiRouter.get('/actor/actors', function(req, res){
		Actor.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({created_at : -1});
	});

    apiRouter.post('/actors', function(req, res) {
        console.log(req.body);
         if (req.body.s === "1") {
            limit = limit + 4;
             console.log(limit);
        } else {
            limit = limit + 0;
        }
        Actor.find({}, function(err, actors) {
            if (err)
                res.send(err);
             if (actors.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({error: 0, data: actors, "loadmore" : loadmore});
        }).limit(limit);
    });
    
   apiRouter.post('/addactor', function(req, res) {
        console.log(req.body);
        var actor = Actor();
        actor.name = req.body.name;
        actor.image = req.body.image;
        actor.description = req.body.description;
        
        actor.save({}, function(err, actors) {
            if (err)
                res.send(err);
       
            res.json({error: 0, data: actors});
        });
    });
        apiRouter.post('/actordetail', function(req, res) {
        console.log(req.body.actor_id);
      
        Actor.find({_id : req.body.actor_id}, function(err, actors) {
            if (err)
                res.send(err);
       
            res.json({error: 0, data: actors});
        });
    });
    
    apiRouter.post('/actorsearchbydata', function(req, res){
            var data = {
                actor: new Array(),
            }
           Actor.find({'name': {$regex : req.body.actorsearch}}, function(err, actors) {     
                 data.actor = actors;
                 console.log(data.actor)
                 console.log(actors)
                if(data){
                res.json({"error":0,"message":'Actor List!','data':data});
                }                       
                else{
                res.send({"error" : 1,"message" : "Unable to find data"});
                }      
            })
         });
        
    
};