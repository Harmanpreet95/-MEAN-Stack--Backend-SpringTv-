/**
 * @author harman
 * @description movie
 * @type type
 */

var Episode = require('../models/episode');
var EpiLikedislike  = require('../models/episodelikedislike');
var limit = 4;
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
	
	apiRouter.get('/episodelist', function(req, res){
		Episode.find({}, function(err, posts){
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});
        apiRouter.get('/episodelistsort', function(req, res){
             if (req.body.s === "1") {
            limit = limit + 4;
        } else {
            limit = limit + 0;
        }
		Episode.find({}, function(err, posts){
			if (err) res.send(err);
         if (posts.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({error: 0, data: posts, "loadmore":loadmore});
			
		}).sort({ created_at : -1 }).limit(limit);
	});
        
        apiRouter.post('/episode/delete', function(req, res) {
        Episode.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'Episode deleted!'});
        })
    });
	// add a post
	apiRouter.post('/addEpisodebyserial', function(req, res){
           console.log(req.body);
               
               var episode = new Episode();
                episode.serial_id = req.body.serialid;
		episode.season_id = req.body.seasonid;
                episode.season_name = req.body.seasonname;
                episode.serial_name = req.body.serialname;
                
                episode.title = req.body.title;
		episode.description = req.body.desc;
                episode.episode_duration = req.body.duration;
                episode.thumbnail = req.body.thumb;
                episode.trailer = req.body.trailer;
                episode.video = req.body.video;
                        
                        
             
		episode.save(function(err, episode){
               
			if(err) res.send(err);
			res.json({error : 0 , season : episode , message: 'Episode Added!'});

		})
		
	});

	apiRouter.post('/episode/allepisodebyid', function(req, res,$scope){
            console.log(req.body);
           console.log(req.body.serial_id);
           console.log(req.body.season_id);
               
         Episode.find({serial_id : req.body.serial_id , season_id : req.body.season_id}, function(err, post){
             console.log(post);
             res.json({error : 0 , allseason : post});
//             console.log(err);
			
		});
		
	});
        
        	apiRouter.post('/episodedetail', function(req, res,$scope){
            console.log(req.body.episodeid);
           console.log(req.body.serialid);
           console.log(req.body.seasonid);
               
         Episode.find({_id :req.body.episodeid, serial_id : req.body.serialid , season_id : req.body.seasonid}, function(err, post){
             console.log(post);
              EpiLikedislike.find({user_id : req.body.user_id , episode_id : req.body.episodeid}, function(err, posts){
                  if(!posts){
                          var like = new EpiLikedislike();
//                        like.
                        like.user_id = req.body.user_id;
                        like.episode_id = req.body.episodeid;
                        like.status = '1';
                        like.save(function(err, post){ 
                         console.log("here"); 
                         console.log(post);
                        } );
                    }
                    });
             res.json({error : 0 , allseason : post});
//             console.log(err);
			
		});
		
	});
      // fetch episode by id  
    apiRouter.post('/episode/fetchepisodebyid', function(req, res) {
         console.log(req.body);
        Episode.findById({'_id': req.body.id}, function(err, user) {
            if (err){
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
        }
        });
    });
    //episode/editepisode
        apiRouter.post('/episode/editepisode', function(req, res) {
           console.log(req.body);
        
        Episode.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.title = req.body.title;
            user.description = req.body.description;
            user.season_id = req.body.seasonid;
            user.serial_id = req.body.serial_id;
            user.season_name = req.body.season_name;
            user.thumbnail = req.body.thumb;
            user.video = req.body.video; 
            user.trailer = req.body.trailer;
            user.serial_name = req.body.serial_name;
               
        
            
         
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
            }
            })
        }
        });
    })

};