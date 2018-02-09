/**
 * @author harman
 * @description movie
 * @type type
 */

var Category = require('../models/category');
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
	
	apiRouter.get('/categorylist', function(req, res){
		Category.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });;
	});

	// add a post
	apiRouter.post('/categories', function(req, res){
           console.log(req.body);
               
               var categories = new Category();
               
                categories.category = req.body.title;
	
                console.log(categories);
		categories.save(function(err, categories){
               console.log(categories)
			if(err) res.send(err);
			res.json({error : 0 , season : categories , message: 'Category Added!'});

		})
		
	});

	//category/categorybyid
   
        apiRouter.post('/category/categorybyid', function(req, res) {
        console.log(req.body);
        Category.findById({'_id': req.body.path}, function(err, user) {
            if (err){
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
        }
        });
    });
    
    
	///plans/editparmal
        apiRouter.post('/category/editparmal', function(req, res) {
        console.log(req.body);
        
        Category.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.category = req.body.title;
        
      
         
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
            }
            })
        }
        });
    });
	//delete
        
        apiRouter.post('/category/deletecategory', function(req, res){
                console.log(req.body);
		Category.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});


};