/**
 * @author harman
 * @description movie
 * @type type
 */

var Likedislike = require('../models/likedislike');
var Video = require('../models/video');
var EpiLikedislike  = require('../models/episodelikedislike');
var Episode = require('../models/episode');
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
	


	apiRouter.post('/likeunlikebyId', function(req, res,$scope){
               console.log(req.body.user_id);
               console.log(req.body.movieid);
               console.log(req.body.status);
               Likedislike.find({user_id : req.body.user_id , movie_id : req.body.movieid}, function(err, posts){
                   console.log("posts");
                   console.log(posts);

            if(posts != ''){
                    if(posts[0].status == 1){
                        console.log("if");
                         
                        posts[0].user_id = req.body.user_id;
                        posts[0].movie_id = req.body.movieid;
                        posts[0].status = '0';
                        console.log(posts);
                        posts[0].save(function(err,post){
//                        console.log(post);
                        Video.find({_id: req.body.movieid}, function(err, movies) {
                            
                            console.log("response11111");
                            console.log(movies[0]);
                            movies[0].title = movies[0].title;
                            movies[0].description = movies[0].description;
                            movies[0].thumbnail = movies[0].thumbnail;
                            movies[0].video = movies[0].video;
                            movies[0].trailer =  movies[0].trailer;
                            movies[0].category = movies[0].category;
                            movies[0].categoryid = movies[0].categoryid;
                            movies[0].subcategoryid  = movies[0].subcategoryid;
                            movies[0].actors = movies[0].actors;
                            movies[0].type =  movies[0].type;
                            movies[0].likes = '0';
                            movies[0].movie_duration = movies[0].movie_duration;
                            
                            movies[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                res.json({error : 0 , likes : post,data : savedata});
                            }
                            })
                            
                        })
                        
                        
//                                if(err) res.send(err);
//                                res.json({error : 0 , likes : post});

                        })
                    }else if(posts[0].status == 0){
                        console.log("if");
                         
                        posts[0].user_id = req.body.user_id;
                        posts[0].movie_id = req.body.movieid;
                        posts[0].status = '1';
                        console.log(posts);
                        posts[0].save(function(err,post){
                        console.log(post);
                        
                       Video.find({_id: req.body.movieid}, function(err, movies) {
                            
                            console.log("response2222");
                            console.log(movies[0]);
                            movies[0].title = movies[0].title;
                            movies[0].description = movies[0].description;
                            movies[0].thumbnail = movies[0].thumbnail;
                            movies[0].video = movies[0].video;
                            movies[0].trailer =  movies[0].trailer;
                            movies[0].category = movies[0].category;
                            movies[0].categoryid = movies[0].categoryid;
                            movies[0].subcategoryid  = movies[0].subcategoryid;
                            movies[0].actors = movies[0].actors;
                            movies[0].type =  movies[0].type;
                            movies[0].likes = '1';
                            movies[0].movie_duration = movies[0].movie_duration;
                            
                            movies[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                     res.json({error : 0 , likes : post,data : savedata});
//                                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
                            }
                            })
                            
                        })
//                                if(err) res.send(err);
//                                res.json({error : 0 , likes : post});

                        })
                    }
             }else{
                        console.log("else");
                        var like = new Likedislike();
//                        like.
                        like.user_id = req.body.user_id;
                        like.movie_id = req.body.movieid;
                        like.status = '0';
                        like.save(function(err, post){
                        console.log(post)
                        Video.find({_id: req.body.movieid}, function(err, movies) {
                            
                            console.log("response2222");
                            console.log(movies[0]);
                            movies[0].title = movies[0].title;
                            movies[0].description = movies[0].description;
                            movies[0].thumbnail = movies[0].thumbnail;
                            movies[0].video = movies[0].video;
                            movies[0].trailer =  movies[0].trailer;
                            movies[0].category = movies[0].category;
                            movies[0].categoryid = movies[0].categoryid;
                            movies[0].subcategoryid  = movies[0].subcategoryid;
                            movies[0].actors = movies[0].actors;
                            movies[0].type =  movies[0].type;
                            movies[0].likes = '0';
                            movies[0].movie_duration = movies[0].movie_duration;
                            
                            movies[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                     res.json({error : 0 , likes : post,data : savedata});
//                                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
                            }
                            })
                            
                        })

                        }) 
                    }
		});
                 Likedislike.find({movie_id : req.body.movieid , status : 1}, function(err, posts){
                   
                   console.log(posts);

                   if(posts.length > 0){
                       console.log("length======================================")
                       console.log(posts.length);
                       $scope.dislikes = posts.length;
                     Video.find({_id : req.body.movieid}, function(err, moviedetail){  
                         console.log(moviedetail);
                         moviedetail[0].countdislikes = $scope.dislikes;
                         console.log("moviedetail");
                         console.log(moviedetail[0]);
                         moviedetail[0].save(function(err, post){
                             console.log(post);
                             Likedislike.find({movie_id : req.body.movieid , status : 0}, function(err, postmovie){
                                console.log(postmovie);
                                console.log("2ndd");
                                console.log(postmovie.length);
                                $scope.likes = postmovie.length;
                                if(posts.length > 0){
                                Video.find({_id : req.body.movieid}, function(err, moviedata){  
                                console.log(moviedetail);
                                moviedata[0].countlikes = $scope.likes;
                                console.log("moviedetail");
                                console.log(moviedetail[0]);
                                moviedata[0].save(function(err, post){
                                
                                        if(err) {
                                            res.send(err);
                                        }else{
                                           res.json({error : 0 ,data : post});

                                      }
                                })
                            
                                })
                            }else{
                                res.json({error : 1 ,msg:"No movie"});
                            }
                             })
                        }) 
                         
                     })
                   }else{
                      res.json({error : 1 ,msg:"No movie"});
                   }
                
         
               })
	});
        
        
        
        
        
            apiRouter.post('/getlikes', function(req,res,$scope){
           console.log(req.body);
               Likedislike.find({movie_id : req.body.movieid , status : 1}, function(err, posts){
                   
                   console.log(posts);

                   if(posts.length > 0){
                       console.log("length======================================")
                       console.log(posts.length);
                       $scope.dislikes = posts.length;
                     Video.find({_id : req.body.movieid}, function(err, moviedetail){  
                         console.log(moviedetail);
                         moviedetail[0].countdislikes = $scope.dislikes;
                         console.log("moviedetail");
                         console.log(moviedetail[0]);
                         moviedetail[0].save(function(err, post){
                             console.log(post);
                             Likedislike.find({movie_id : req.body.movieid , status : 0}, function(err, postmovie){
                                console.log(postmovie);
                                console.log("2ndd");
                                console.log(postmovie.length);
                                $scope.likes = postmovie.length;
                                if(posts.length > 0){
                                Video.find({_id : req.body.movieid}, function(err, moviedata){  
                                console.log(moviedetail);
                                moviedata[0].countlikes = $scope.likes;
                                console.log("moviedetail");
                                console.log(moviedetail[0]);
                                moviedata[0].save(function(err, post){
                                
                                        if(err) {
                                            res.send(err);
                                        }else{
                                           res.json({error : 0 ,data : post});

                                      }
                                })
                            
                                })
                            }else{
                                res.json({error : 1 ,msg:"No movie"});
                            }
                             })
                        }) 
                         
                     })
                   }else{
                      res.json({error : 1 ,msg:"No movie"});
                   }
                
         
               })
           })
           
           apiRouter.post('/likesdislike', function(req, res){
        
             Video.findOne({'_id': req.body.movieid}, function(err, movie) {
                 Likedislike.find({movie_id : req.body.movieid , status : 0}, function(err, postmovie){
            if (err){
//                res.send(err);
                 res.send({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : movie});
        }
        });
	});	
	});
           
           
           apiRouter.post('/likeunlikebyepisodeId', function(req, res,$scope){
               console.log(req.body.user_id);
               console.log(req.body.episodeid);
               console.log(req.body.status);
               EpiLikedislike.find({user_id : req.body.user_id , episode_id : req.body.episodeid}, function(err, posts){
                   console.log("posts");
                   console.log(posts);
                    console.log(posts.length);
                   
            if(posts.length !==0){
                    if(posts[0].status == 1){
                        console.log("if");
                         
                        posts[0].user_id = req.body.user_id;
                        posts[0].episode_id = req.body.episodeid;
                        posts[0].status = '0';
                        console.log(posts);
                        posts[0].save(function(err,post){
//                        console.log(post);
                        Episode.find({_id: req.body.episodeid}, function(err, episodes) {
                            
                            console.log("response11111");
                            console.log(episodes[0]);
                   
                            episodes[0].likes = '0';
                      
                            
                            episodes[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                res.json({error : 0 , likes : post,data : savedata});
                            }
                            })
                            
                        })
//                                if(err) res.send(err);
//                                res.json({error : 0 , likes : post});

                        })
                    }else if(posts[0].status == 0){
                        console.log("if");
                         
                        posts[0].user_id = req.body.user_id;
                        posts[0].episode_id = req.body.episodeid;
                        posts[0].status = '1';
                        console.log(posts);
                        posts[0].save(function(err,post){
                        console.log(post);
                        
                       Episode.find({_id: req.body.episodeid}, function(err, episodes) {
                            
                            console.log("response2222");
                            console.log(episodes[0]);
                         
                            episodes[0].likes = '1';
                           
                            
                            episodes[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                     res.json({error : 0 , likes : post,data : savedata});
//                                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
                            }
                            })
                            
                        })
//                                if(err) res.send(err);
//                                res.json({error : 0 , likes : post});

                        })
                    }
             }else{
                        console.log("else");
                        var epilike = EpiLikedislike();
//                        like.
                        epilike.user_id = req.body.user_id;
                        epilike.episode_id = req.body.episodeid;
                        epilike.status = '0';
                        console.log("ghgjhgh");
                        //console.log(epilike);
                        epilike.save();
                        //return false;
                        console.log("here11111");
                        Episode.find({_id:req.body.episodeid}, function(err, episodes) {
                            
                            console.log("response2222");
                            console.log(episodes);
                            //return false;
                            episodes[0].likes = '0';
                            episodes[0].save(function(err,savedata) {
                            console.log('savedata');
                            console.log(savedata);
                            if (err){
                                    res.send({"error" : 1,"message" : "Unable to edit user"});
                                }else{
//                                     res.json({error : 0 , likes : post,data : savedata});
//                                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
                            }
                            })
                            
                        })
                        
                        
                   }
 
              EpiLikedislike.find({episode_id : req.body.episodeid }, function(err, posts){
                  $scope.dislikes=0;
                  $scope.likes=0;
                   console.log("here");
                   console.log(posts);
                   var like=0;
                   var dislike=0;
                   for(var i=0;i<posts.length;i++){
                       if(posts[i].status===0){
                           dislike=dislike+1;
                       }else{
                           like=like+1;
                       }
                   }
                   console.log("rrrrrrrrrrr");
                   console.log(like);
                   console.log(dislike);
                  
                     Episode.find({_id : req.body.episodeid}, function(err, episodedetail){  
                         console.log(episodedetail);
                         if(episodedetail[0].likes===1){
                             if(episodedetail[0].countdislikes!==0){
                         episodedetail[0].countdislikes = episodedetail[0].countdislikes-1;}
                     else{
                         episodedetail[0].countdislikes = episodedetail[0].countdislikes;
                     }
                         console.log("episodedetail_dislike");
//                          episodedetail[0].countdislikes = dislike;
                         episodedetail[0].countlikes = episodedetail[0].countlikes+1;
                         episodedetail[0].save(function(err, post){
                             console.log(post);
                             res.json({error : 0 ,data : post});
                         });
                     }else{ 
                         
                         episodedetail[0].countdislikes = episodedetail[0].countdislikes+1;
                         console.log("episodedetail_dislike");
//                          episodedetail[0].countdislikes = dislike;
if(episodedetail[0].countlikes!==0){
                         episodedetail[0].countlikes = episodedetail[0].countlikes-1;
                         }else{
                             episodedetail[0].countlikes = episodedetail[0].countlikes;
                         }
                         episodedetail[0].save(function(err, post){
                             console.log(post);
                             res.json({error : 0 ,data : post});
                         });
                     }
                     });
                 
       
                           
                 }); 
         
               });
                
 });
        
        
         apiRouter.post('/getlikesbyepisode', function(req,res,$scope){
           console.log(req.body);
               EpiLikedislike.find({episode_id : req.body.episodeid , status : 1}, function(err, posts){
                   
                   console.log(posts);

                   if(posts.length > 0){
                       console.log("length======================================")
                       console.log(posts.length);
                       $scope.dislikes = posts.length;
                     Episode.find({_id : req.body.episodeid}, function(err, episodedetail){  
                         console.log(episodedetail);
                         episodedetail[0].countdislikes = $scope.dislikes;
                         console.log("episodedetail");
                         console.log(episodedetail[0]);
                         episodedetail[0].save(function(err, post){
                             console.log(post);
                             EpiLikedislike.find({movie_id : req.body.episodeid , status : 0}, function(err, postepisode){
                                console.log(postepisode);
                                console.log("2ndd");
                                console.log(postepisode.length);
                                $scope.likes = postepisode.length;
                                if(posts.length > 0){
                                Episode.find({_id : req.body.episodeid}, function(err, epidata){  
                             
                                epidata[0].countlikes = $scope.likes;
                                console.log("moviedetail");
                                console.log(epidata[0]);
                                epidata[0].save(function(err, post){
                                
                                        if(err) {
                                            res.send(err);
                                        }else{
                                           res.json({error : 0 ,data : post});

                                      }
                                })
                            
                                })
                            }else{
                                res.json({error : 1 ,msg:"No movie"});
                            }
                             })
                        }) 
                         
                     })
                   }else{
                       res.json({error : 1 ,msg:"No movie"});
                   }
                
         
               })
           })
           
     apiRouter.post('/likesdislikeepisode', function(req, res){
         Episode.findOne({'_id': req.body.episodeid}, function(err, episode) {
            if (err){
//                res.send(err);
                 res.send({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : episode});
        }
       
	});	
	});      
           
};