/**
 * @author harman
 * @description movie
 * @type type
 */
var Video = require('../models/video');
var Category = require('../models/category');
var SubCategory = require('../models/subcategory');
var Actor = require('../models/actor');
var Serial = require('../models/serial');
var limit = 4;
// Posts API
module.exports = function(apiRouter,serialize){
	
	  apiRouter.get('/movies', function(req, res) {
        Video.find({}, function(err, posts) {
            if (err)
                res.send(err);

            res.json({error: 0, data: posts});
        });
    });
	
        // get all posts
         apiRouter.get('/videos', function(req, res){
             
                    Video.find({}, function(err, posts){
                    console.log(posts);
                    
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
                        
                    
		}).sort({ created_at : -1 });
            });
            
            
        apiRouter.post('/latestmovies', function(req, res) {
         if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
        Video.find({}, function(err, posts) {
            if (err)
                res.send(err);
            if (posts.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({error: 0, data: posts, "loadmore":loadmore});
        }).sort({_id: -1}).limit(limit);
    });
    
    
            apiRouter.get('/latesttrailers', function(req, res) {
        Video.find({}, function(err, posts) {
            if (err)
                res.send(err);
           
            res.json({error: 0, data: posts});
        }).sort({created_at: -1}).limit(10);
    });
    
                                      
    apiRouter.post('/subcategorylist', function(req, res) {
        SubCategory.find({category_id: req.body.cat_id}, function(err, posts) {
            if (err)
                res.send(err);
            res.json({error: 0, data: posts});
        });
    });
    
	apiRouter.post('/videos', function(req, res){
                    if (req.body.loaddata == 1) {
                        limit = limit + 4;
                        console.log(limit);
                    } else {
                        console.log("loaddata is 0");
                        limit = limit + 0;
                        console.log(limit);
                    }
                    Video.find({}, function(err, movies) {
                        if (err)
                            res.send(err);
                        if (movies.length >= limit) {
                            console.log(movies.length);
                            var loadmore = 1;
                        } else {
                            var loadmore = 0;
                        }
                        res.json({"error": 0, "data": movies, "loadmore": loadmore});
                    }).limit(limit);
        
        

	});

	// add a post
	apiRouter.post('/addvideos', function(req, res){
            console.log("movies=============================================");
		console.log(req.body);
                console.log("req");
                console.log(req.body.actors);
                console.log('Size of object: '+ Object.keys(req.body.actors).length);
          
//                return false;
		var movie = new Video();
		movie.title = req.body.title;
		movie.description = req.body.description;
                movie.thumbnail = req.body.image;
                movie.type = req.body.subcatname;
                movie.category = req.body.category;
                movie.trailer = req.body.trailer;
                movie.price = req.body.price;
                movie.video = req.body.video;  
                movie.movie_duration = req.body.duration;
                movie.categoryid = req.body.categoryId;
                movie.subcategoryid = req.body.subcatId;
                movie.actors = serialize.serialize(req.body.actors);                
                console.log(movie);
                //return false;
		movie.save(function(err, movie){
                    console.log("==============================================================================================");
                  console.log(movie);
                  console.log("movieidd=>>>>>>>>>>>>>>>>>>>>",movie._id);
                   console.log("==============================================================================================");
//                   console.log(req.body.actors.length);
//                    console.log(serialize.unserialize(req.body.actors));
//                    var actorss = serialize.unserialize(req.body.actors);
//                    console.log('actorss');
//                    console.log(actorss.length);
                        console.log("==============================forrrrrrrrrrrrrrr================================================================")
                            for(var j = 0 ; j < Object.keys(req.body.actors).length;j++){
                                console.log("===============");
                                
//                                console.log(req.body.actors.length);
                                console.log(req.body.actors[j].image);
                                console.log(req.body.actors[j].name);
                                var actor = new Actor();
                                actor.name = req.body.actors[j].name;
                                actor.image = req.body.actors[j].image;
                                actor.description = req.body.actors[j].description;
                                actor.movie_id = movie._id;
                                actor.movie_thumb = req.body.image;
                                console.log('actor.movie_id');
                                console.log(actor.movie_id);
                                console.log('actors');
                                console.log(actor);
                                actor.save(function(err, actors){
                                  console.log("save");
                                  console.log(actors);
                              })
                           
                        }
//                        console.log("length");
//                        console.log(serialize.unserialize(movie.actors).length);                    
			if(err) res.send(err);
			res.json({error : 0 , movie : movie , message: 'Movie Added!'});
                        
                     
		})
	});
        //delete movie
	apiRouter.post('/delete', function(req, res){
                console.log(req.body);
		Video.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});
        
        
        //movie by id
        apiRouter.post('/videos/moviebyid', function(req, res){
            console.log(req.body.path);
		Video.findById(req.body.path, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
        //web
        apiRouter.post('/moviebyid', function(req, res) {
        console.log("here i am");
        console.log(req.body.id);
        Video.findById({'_id': req.body.id}, function(err, post) {
            if (err)
                res.send(err);
            console.log(post);
            res.json({error: 0, data: post});
        });
    });
        //get by category
//        apiRouter.post('/videos/moviebycatid', function(req, res){
//            console.log(req.body.catid);
//		Video.find({categoryid : req.body.catid}, function(err, post){
//			if (err) res.send(err);
//
//			res.json({error : 0 , data : post});
//		});
//	});
          apiRouter.post('/videos/moviebycatid', function(req, res) {
           if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
        Video.find({categoryid: req.body.cat_id}, function(err, movies) {
            if (err)
                res.send(err);
            if (movies.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({"error": 0, "data": movies, "loadmore": loadmore});
        }).limit(limit);
    });
  
        
        //get by subcategory
        apiRouter.post('/videos/moviebysubcatid', function(req, res){
            console.log(req.body.subcatid);
		Video.find({subcategoryid : req.body.subcatid}, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
        
        
        //Movie  By actors
        apiRouter.post('/videos/moviebyactors', function(req, res){
            console.log(req.body.actorid);
		Video.find({subcategoryid : req.body.actorid}, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
        //Movie  By actors
        apiRouter.post('/videos/moviebyactors', function(req, res){
            console.log(req.body.actorid);
		Video.find({subcategoryid : req.body.actorid}, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
        
        
        apiRouter.post('/editmovie', function(req, res){
            Video.findById({'_id': req.body.id}, function(err, movie) {
            console.log("kuldeep");
            console.log(movie);
            if (err){
                res.send(err);
            }else{
               // movie.username = req.body.username;
                movie.title = req.body.title;
		movie.description = req.body.description;
                movie.thumbnail = req.body.image;
                movie.type = req.body.subcatname;
                movie.category = req.body.category;
                movie.trailer = req.body.trailer;
                movie.price = req.body.price;
                movie.video = req.body.video;  
                movie.movie_duration = req.body.duration;
                movie.categoryid = req.body.categoryId;
                movie.subcategoryid = req.body.subcatId;
                movie.actors = serialize.serialize(req.body.actors);   
            movie.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit movie"});
                }else{
                res.json({"error":0,"message":'Movie updated!','data':movie});
            }
            })
        }
        });
            
	});
        
        
         apiRouter.post('/Movielist_actor', function(req, res){
            Actor.find({'name': req.body.name}, function(err, movie) {
                 if (err){
                    res.send({"error" : 1,"message" : "Unable to find actor details"});
                }else{
                res.json({"error":0,"message":'Movie List!','data':movie});
                }
            })
         });
        
        apiRouter.post('/searchbydata', function(req, res){
            var data = {
                video: new Array(),
                serials: new Array()
            }
           Video.find({'title': {$regex : req.body.search}}, function(err, movie) {     
                 data.video = movie;
                 console.log(data.video)
                 console.log(movie)
             Serial.find({'title': {$regex : req.body.search}}, function(err, serials) {
                 data.serials = serials;
                 console.log(data.serials)
                 console.log(serials)
                if(data){
                res.json({"error":0,"message":'Movie List!','data':data});
                }                       
                else{
                res.send({"error" : 1,"message" : "Unable to find data"});
                }      
            })
            })


         });
         
         
         apiRouter.post('/latestsearchbydata', function(req, res){
            var data = {
                latest: new Array(),
            }
           Video.find({'title': {$regex : req.body.latestsearch}}, function(err, latest) {     
                 data.latest = latest;
                 console.log(data.latest)
                 console.log(latest)
                if(data){
                res.json({"error":0,"message":'Movie List!','data':data});
                }                       
                else{
                res.send({"error" : 1,"message" : "Unable to find data"});
                }      
            })
         });
         
         apiRouter.post('/moviesearchbydata', function(req, res){
            var data = {
                movie: new Array(),
            }
           Video.find({'title': {$regex : req.body.moviesearch}}, function(err, movie) {     
                 data.movie = movie;
                 console.log(data.movie)
                 console.log(movie)
                if(data){
                res.json({"error":0,"message":'Movie List!','data':data});
                }                       
                else{
                res.send({"error" : 1,"message" : "Unable to find data"});
                }      
            })
         });
};