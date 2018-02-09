/**
 * @author harman
 * @description movie
 * @type type
 */
var Buynow = require('../models/buynow');
// Posts API
module.exports = function(apiRouter,serialize){
	
//	  apiRouter.get('/movies', function(req, res) {
//        Video.find({}, function(err, posts) {
//            if (err)
//                res.send(err);
//
//            res.json({error: 0, data: posts});
//        });
//    });
	
        // get all posts
//         apiRouter.get('/videos', function(req, res){
//                    Video.find({}, function(err, posts){
//                    console.log(posts);
//                    
//			if (err) res.send(err);
//
//			res.json({error : 0 , data : posts});
//                        
//                    
//		}).sort({ created_at : -1 });
//            });
            
     
    
	

	// add a post
	apiRouter.post('/buynow', function(req, res){
           
//                return false;
		var buynow = new Buynow();
                buynow.userid = req.body.userid;
                buynow.paymentmethod = req.body.paymentmethod;
		buynow.movie_id = req.body.movie_id;
                buynow.movie_name = req.body.movie_name;
                buynow.movie_price = req.body.movie_price;
                buynow.quantity = req.body.quantity;
                buynow.transactionid = req.body.transactionid;
                buynow.status = "Pending";
                buynow.b_name = req.body.b_name;
                buynow.b_phone = req.body.b_phone;
                buynow.b_address = req.body.b_address;
                buynow.b_city = req.body.b_city;
                buynow.b_state = req.body.b_state;
                buynow.b_country = req.body.b_country;
                buynow.b_zip = req.body.b_zip;
                buynow.s_name = req.body.s_name;
                buynow.s_phone = req.body.s_phone;
                buynow.s_address = req.body.s_address;
                buynow.s_city = req.body.s_city;
                buynow.s_state = req.body.s_state;
                buynow.s_country = req.body.s_country;
                buynow.s_zip = req.body.s_zip;
                console.log(buynow);
		buynow.save(function(err, movie){              
			if(err) res.send(err);
			res.json({error : 0 , movie : movie , message: 'buynow done!'});
                        
		})
	});
        //delete movie
//	apiRouter.post('/delete', function(req, res){
//                console.log(req.body);
//		Video.remove({
//			_id: req.body.id
//		}, function(err, post){
//			if(err) res.send(err);
//
//			res.json({ message: 'Post deleted!' });
//		})
//	});
        
      
        
        
};