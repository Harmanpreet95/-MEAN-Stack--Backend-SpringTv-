/**
 * @author harman
 * @description movie
 * @type type
 */

var Subcategory = require('../models/subcategory');
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
	
	apiRouter.get('/subcategory/categorylist', function(req, res){
		Subcategory.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});

	// add a post
	apiRouter.post('/subcategories', function(req, res){
           console.log(req.body);
               
               var subcategories = new Subcategory();
               
                subcategories.category_id = req.body.category_id;
                subcategories.category = req.body.category_name;
                subcategories.subcategory = req.body.sub_category;
                
	
                console.log(subcategories);
		subcategories.save(function(err, categories){
               console.log(categories)
			if(err) res.send(err);
			res.json({error : 0 , SubCategory : categories , message: 'SubCategory Added!'});

		})
		
	});
        //delete subcategory
	apiRouter.post('/subcategory/delete', function(req, res){
                console.log(req.body);
		Subcategory.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});
        apiRouter.post('/subcatbyid', function(req, res){
            console.log(req.body.category_id);
		Subcategory.find({category_id : req.body.category_id}, function(err, post){
                    console.log(post);
			if (err) res.send(err);

			res.json({error : 0 , subcatlist : post});
		});
	});

	//subcat by id
            apiRouter.post('/subcategory/subcategorybyid', function(req, res){
            console.log(req.body.id);
		Subcategory.find({_id : req.body.id}, function(err, post){
                    console.log(post);
			if (err) res.send(err);

			res.json({error : 0 , subcatlist : post});
		});
	});
        // subcategory/editparmal
        apiRouter.post('/subcategory/editparmal', function(req, res) {
        console.log(req.body);
        
        Subcategory.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.category = req.body.cat;
            user.subcategory = req.body.subcat;
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
};