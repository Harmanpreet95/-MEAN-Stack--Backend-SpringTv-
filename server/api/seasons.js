/**
 * @author harman
 * @description movie
 * @type type
 */
var Serial = require('../models/serial');
var Season = require('../models/season');
// Posts API
module.exports = function(apiRouter,s3,randomString,userupload){
	
	
        // get all posts
	apiRouter.get('/seasons', function(req, res){
		Season.find({}, function(err, posts){
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});

	// add a post
	apiRouter.post('/season', function(req, res){
           
               
               var season = new Season();
                season.serialid = req.body.id;
		season.season_name = req.body.title;
                season.price = req.body.price;
//		season.description = req.body.description;
//                season.thumbnail = req.body.thumbnail;
//                season.trailer = req.body.trailer;
                        
                        
             
		season.save(function(err, movie){
               
			if(err) res.send(err);
			res.json({error : 0 , season : movie , message: 'Season Added!'});

		})
		
	});
        //get season by id	
	apiRouter.post('/allseasonsbyid', function(req, res,$scope){
           console.log(req.body.id);
               
         Season.find({serialid : req.body.id},{season_name : 1}, function(err, post){
             console.log(post);
             res.json({error : 0 , allseason : post});
//             console.log(err);
			
		});
		
	});
        //delete movie
	
        
//        movie by id
        apiRouter.post('/seasonbyid', function(req, res){
            console.log(req.body.id);
		Season.findById(req.body.id, function(err, post){
			if (err) res.send(err);
                        console.log(post);
			res.json({error : 0 , data : post});
		});
	});
//        
        apiRouter.post('/seasonimage',userupload.array('file',3), function(req, res, next) {
            
        console.log("season");
        console.log(req.body);
        console.log(req.files);
        
        res.send(req.files);
        
    });
};