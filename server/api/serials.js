var Serial = require('../models/serial');
//var Serial = require('../models/serial');
var Season= require('../models/season');
var Episode= require('../models/episode');
var limit = 4;
// Posts API
module.exports = function(apiRouter,s3, randomString,userupload){
	
	
        // get all posts
//	apiRouter.get('/serials', function(req, res){
//		Serial.find({}, function(err, posts){
//			if (err) res.send(err);
//
//			res.json({error : 0 , data : posts});
//		});
//	});.sort({ created_at : -1 });
apiRouter.get('/serials', function(req, res){
             if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
		Serial.find({}, function(err, posts){
			if (err) res.send(err);
if (posts.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
			res.json({error : 0 , data : posts , "loadmore":loadmore});
		}).limit(limit).sort({ created_at : -1 });
	});

	// add a post
	apiRouter.post('/serials', function(req, res){
		//console.log(req.body);
		var serial = new Serial();
		serial.title = req.body.title;
		serial.description = req.body.description;
                serial.thumbnail = req.body.image;
                serial.trailer = req.body.trailer;
                console.log(serial);
		serial.save(function(err, movie){
                    console.log(movie);
			if(err) res.send(err);

			res.json(movie);
		})
	});
        
//        apiRouter.post('/serial/serialbyid', function(req, res){
//            console.log(req.body.id);
//		Serial.findById(req.body.id, function(err, post){
//			if (err) res.send(err);
//
//			res.json({error : 0 , data : post});
//		});
//	});
          apiRouter.post('/serialbyid', function(req, res){
               if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
            Serial.findById(req.body.id, function(err, post){
                if (err) res.send(err);
 if (post.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
                 res.json({error : 0 , data : post ,"loadmore":loadmore});
            }).limit(limit);
        });
        apiRouter.post('/serial/delete', function(req, res) {
        Serial.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'Serial deleted!'});
        })
    });
    
    
    
    
    
    
    
    
    //serial/editparmal
        apiRouter.post('/serial/editparmal', function(req, res) {
        console.log(req.body);
        
        Serial.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.title = req.body.title;
            user.description = req.body.description;
            user.trailer = req.body.trailer;
            user.thumbnail = req.body.thumbnail;
        
            
         
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit serial"});
                }else{
                res.json({"error":0,"message":'Serial Updated','data':user});
            }
            })
        }
        });
    })
    //  
          apiRouter.post('/serial/uploaduserimage',userupload.array('file',3), function(req, res, next) {
        console.log("upload");
        console.log(req.body);
        console.log(req.files);
        
        res.send(req.files);
        
    });
    
        apiRouter.post('/allepisodebyid', function(req, res){
               if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
            console.log(req.body);
//           console.log(req.body.serial_id);
          // console.log(req.body.seasonid);
               //return false;
         Episode.find({serial_id : req.body.serial_id , season_id : req.body.season_id}, function(err, post){
             if (post.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
             console.log("yyyyyyyyyyyyyy");
             console.log(post);
             res.json({error : 0 , allseason : post,"loadmore":loadmore});
//             console.log(err);
   
  }).limit(limit);
  
 });
 
   apiRouter.post('/episodebyid', function(req, res){
            console.log(req.body.id);
            Episode.findById(req.body.id, function(err, post){
                if (err) res.send(err);

                 res.json({error : 0 , data : post});
            });
        });
        
        
        
        apiRouter.post('/serialsearchbydata', function(req, res){
            var data = {
                serial: new Array(),
            }
           Serial.find({'title': {$regex : req.body.serialsearch}}, function(err, serial) {     
                 data.serial = serial;
                 console.log(data.serial)
                 console.log(serial)
                if(data){
                res.json({"error":0,"message":'Serial List!','data':data});
                }                       
                else{
                res.send({"error" : 1,"message" : "Unable to find data"});
                }      
            })
         });
        
};