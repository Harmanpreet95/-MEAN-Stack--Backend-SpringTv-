/**
 * @author harman
 * @description movie
 * @type type
 */
var Video = require('../models/video');
var PaymentStatus = require('../models/paymentstatus');
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
//	
	apiRouter.get('/payment/paymentlist', function(req, res){
		Payment.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		});
	});

	// add a post
	apiRouter.post('/payment/paymentstatus', function(req, res){
           console.log(req.body);
               
               var paymentstatus = new PaymentStatus();
               console.log(req.body.userid);
               paymentstatus.userid = req.body.userid;
               console.log(paymentstatus);
               PaymentStatus.find({'userid': req.body.userid}, function(err, user) {
                   console.log("user");
                   console.log(user);
                if(user == ''){
                     console.log("if");
	       paymentstatus.save(function(err, userstatus){
//                console.log(payments)
			if(err) res.send(err);
			res.json({error : 0 , pay : userstatus , message: 'Payment Successful!'});

		})
            }else{
                console.log("else");
               PaymentStatus.find({'userid': req.body.userid}, function(err, userstatus) {
                   
                   console.log(user);
                   res.json({error : 0 , pay : userstatus , message: 'Payment Successful!'});
               })
            }
            })
		
	});
    apiRouter.post('/paymentstatus', function(req, res){
            console.log("hhhhhhhhhhhhhhhhhhhhh");
           console.log(req.body);
               
               var paymentstatus = new PaymentStatus();
               console.log(req.body.userid);
               paymentstatus.userid = req.body.userid;
               console.log(paymentstatus);
               PaymentStatus.find({'userid': req.body.userid}, function(err, user) {
                   console.log("user");
                   console.log(user);
                if(user == ''){
                     console.log("if");
	       paymentstatus.save(function(err, userstatus){
//                console.log(payments)
			if(err) res.send(err);
			res.json({error : 0 , pay : userstatus , message: 'Payment Successful!'});

		})
            }else{
                console.log("else");
               PaymentStatus.find({'userid': req.body.userid}, function(err, userstatus) {
                   
                   console.log(userstatus);
                   res.json({error : 0 , pay : userstatus , message: 'Payment Successful!'});
               })
            }
            })
		
	});

	//category/categorybyid
   
//        apiRouter.post('/category/categorybyid', function(req, res) {
//        console.log(req.body);
//        Category.findById({'_id': req.body.path}, function(err, user) {
//            if (err){
////                res.send(err);
//                 res.json({"message" : "Unable to fetch details","error" : 1 });
//            }else{
//            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
//        }
//        });
//    });
		
	


};