var Plan = require('../models/plan');

// Posts API
module.exports = function(apiRouter){
	
	
        // get all posts
	apiRouter.get('/plans/planlist', function(req, res){
		Plan.find({}, function(err, posts){
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});

	// add a post
	apiRouter.post('/plans/plannames', function(req, res){
		console.log(req.body);
		var arr = [];
                Plan.find({title:req.body.subscription}, function(err, post){
			console.log("post");
			console.log(post);
                        console.log("array");
                        console.log(post.length);
                       if(post.length == 0){
                                var plan = new Plan();
                                plan.title = req.body.subscription;
                                plan.days = req.body.days;
                                plan.price = req.body.price;
                                plan.planimage = req.body.image;
                                console.log(plan);
                                plan.save(function(err, planlist){
                                    console.log(planlist);
                                        if(err) {
                //                            console.log(err);
                                            res.send(err);
                                        }else{
                                            console.log("snaa");
                                        res.json({msg: "PLAN Added Successfully",planslistall:planlist});
                                    }  
                                })
                       }else{
                        
                        for(var i = 0 ; i < post.length ; i++){
                            console.log(post[i].title);
                            if(post[i].title == req.body.subscription){
                                console.log("true");
                                res.json({msg: "PLAN name already used"});
                                return false;
                            }else{
                                var plan = new Plan();
                                plan.title = req.body.subscription;
                                plan.days = req.body.days;
                                plan.price = req.body.price;
                                plan.planimage = req.body.image;
                                console.log(plan);
                                plan.save(function(err, planlist){
                                    console.log(planlist);
                                        if(err) {
                //                            console.log(err);
                                            res.send(err);
                                        }else{
                                            console.log("snaa");
                                        res.json({msg : 'Plan added' , planslistall:planlist});
                                    }  
                                })
                            }
                        }
                    }
		
                });
	});
        apiRouter.post('/Plans/delete', function(req, res) {
        Plan.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted!'});
        })
    });
        //plans/parmal
        apiRouter.post('/plans/parmal', function(req, res){
            console.log(req.body.id);
		Plan.findById(req.body.id, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
        
        ///plans/editparmal
        apiRouter.post('/plans/editparmal', function(req, res) {
        console.log(req.body);
        
        Plan.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.title = req.body.title;
            user.days = req.body.days;
            user.price = req.body.price;
            user.planimage = req.body.image;
            console.log(user.image);
         
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
    
    
    apiRouter.post('/plan/plandata', function(req, res){
		console.log(req.body);
		
                Payment.find({userid:req.body.userid}, function(err, post){
//                    console.log("plandata::::::::::");
//                    console.log(post);
                    //res.send(post);
                    var paymentmethod =post[0];
                    var pid = post[0].planid;
                    Plan.findById({_id:pid}, function(err, ppic){
                        //res.send(ppic);
                        res.json({"error":0,'data':ppic , 'method': paymentmethod});
                    });
                });
            });
    
};