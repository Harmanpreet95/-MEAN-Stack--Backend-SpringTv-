var Video = require('../models/video');
var Episode = require('../models/episode');
var Download= require('../models/download');
var limit = 4;

// Posts API
module.exports = function(apiRouter){
	
	
        // get all posts
	apiRouter.get('/downloads/downloadfile', function(req, res){
		Download.find({}, function(err, posts){
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});

	// add a post
	apiRouter.post('/downloads/downloadfile', function(req, res){
		console.log(req.body.epiormovid);
		
                
                Video.find({'_id' : req.body.epiormovid}, function(err, post){
                    console.log(post);
                    if(post == '' || post == undefined){
                        console.log("if");
                        Episode.find({'_id' : req.body.epiormovid}, function(err, postepisode){
                            console.log("EpisodeDetail+++++++++++++++++++++++")
                            console.log(postepisode[0].episode_duration);
                            var download = Download(); 
                            download.title = postepisode[0].title;
                            download.season_id = postepisode[0].season_id;
                            download.serial_id = postepisode[0].serial_id;
                            download.season_name = postepisode[0].season_name;
                            download.serial_name = postepisode[0].serial_name;
                            download.description = postepisode[0].description;
                            download.thumbnail = postepisode[0].thumbnail;
                            download.video = postepisode[0].video;
                            download.trailer = postepisode[0].trailer;
                            download.episode_duration = postepisode[0].episode_duration;
                            console.log("DOWNLOAD+++++++++++++++++++++++")
                            console.log(download);
                            download.save(function(err,dataall){
                           
                                res.json({error : 0 , msg : 'Successfully Downloaded',data : dataall});
                        })
                            
                        })
                        
                    }else{
                        console.log("else");
                        
                        var download = Download(); 
                        download.title = post[0].title;
                        download.description = post[0].description;
                        download.thumbnail = post[0].thumbnail;
                        download.video = post[0].video;
                        download.trailer = post[0].trailer;
                        download.category =  post[0].category;
                        download.categoryid =  post[0].categoryid;
                        download.subcategoryid =  post[0].subcategoryid;
                        download.actors =  post[0].actors;
                        download.type =  post[0].type;
                        download.likes =  post[0].likes;
                        download.movie_duration =  post[0].movie_duration;
                        download.save(function(err,dataall){
                           
                                res.json({error : 0 , msg : 'Successfully Downloaded',data : dataall});
                        })
//                        res.json({error : 0 , data : post});
                    }     
                })

	});
};