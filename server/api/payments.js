/**
 * @author harman
 * @description movie
 * @type type
 */
var Video = require('../models/video');
var Payment = require('../models/payment');
var PaymentStatus = require('../models/paymentstatus');
// Posts API



module.exports = function(apiRouter,gateway){
	
//	
	apiRouter.get('/payment/paymentlist', function(req, res){
		Payment.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		});
	});

	// add a post
	apiRouter.post('/payment/paymentgateway', function(req, res){
           console.log(req.body);          
               var payments = new Payment();
               console.log(req.body.transactionid);
               console.log(req.body.price);
               console.log(req.body.planid);
               console.log(req.body.status);
               console.log(req.body.planname);
               console.log(req.body.userid);
               console.log(req.body.paymentmethod);
               
               
               payments.transactionid = req.body.transactionid;
               payments.price = req.body.price;
//               payments.epiormovid = req.body.epiormovid;
               payments.planid = req.body.planid;
               payments.planname = req.body.planname;
//               payments.epimovname = req.body.epimovname;
               payments.userid = req.body.userid;
               payments.status = req.body.status;
               payments.paymentmethod = req.body.paymentmethod;
               
	
                console.log(payments);
		payments.save(function(err, payments){
                console.log(payments)
//                if(payments.status == "approved"){
                   
                    if(payments.status === "Completed" || "approved" || "submitted_for_settlement" || "paid"){
                    PaymentStatus.find({'userid': req.body.userid}, function(err, paymentst) {
                        console.log("+===========================================+++++++");
                        console.log(paymentst);
                        console.log(paymentst[0].status);
                        paymentst[0].status = '1';
                        paymentst[0].userid = paymentst[0].userid;
                        paymentst[0].save(function(err,paymentstu) {
                            if (err){
                                console.log("iffffffffffffffffffffffffffffff");
                                console.log(err);
                                res.send({"error" : 1,"message" : "Error"});
                            }else{
                            res.json({"error":0,"message":'Payment Successful!','data':payments,'status':paymentstu});
                        }
                        })
//                        res.json({error : 0 , payment : payments , message: 'Payment Successful!'});
                    });
                }
			
			
                        
		})
		
	});
        apiRouter.post('/payment/orderpaymentgateway', function(req, res){
           console.log(req.body);
               
               var payments = new Payment();
               console.log(req.body.transactionid);
               console.log(req.body.price);
               console.log(req.body.itemid);
//               console.log(req.body.status);
               console.log(req.body.itemname);
               console.log(req.body.userid);
               console.log(req.body.paymentmethod);
               
               
               payments.transactionid = req.body.transactionid;
               payments.price = req.body.price;
//               payments.epiormovid = req.body.epiormovid;
               payments.itemid = req.body.itemid;
               payments.itemname = req.body.itemname;
//               payments.epimovname = req.body.epimovname;
               payments.userid = req.body.userid;
               payments.status = "Pending";
               payments.paymentmethod = req.body.paymentmethod;
               
	
                console.log(payments);
		payments.save(function(err, payments){
                console.log(payments);
                res.json(payments);
            });
        });
//                if(payments.status == "approved"){
         apiRouter.post('/payment/plandata', function(req, res){
		console.log(req.body);
		
                Payment.find({userid:req.body.userid}, function(err, post){
//                    console.log("plandata::::::::::");
//                    console.log(post);
                    res.send(post);
                    
                });
            });
            
             apiRouter.post('/payment/update', function(req, res){
		console.log(req.body);
		
                PaymentStatus.find({userid:req.body.userid}, function(err, paymentst){
                    console.log("update status::::::::::");
                    console.log(paymentst);
                    console.log(paymentst[0].status);
             
                paymentst[0].status='0';
                paymentst[0].save( function(err,status) {
                    if(err) {
                        res.send({"error" : 1,"message" : "Error"});
                    }else{
                        console.log(status);
                         res.json({"error":0,'data':status});
                    }
                     
                });
                   
                });
            });
      apiRouter.post('/payment/braintree_payment', function(req, res){
           console.log(req.body);
               
               var payments = new Payment();
               console.log(req.body.transactionid);
               console.log(req.body.price);
               console.log(req.body.planid);
               console.log(req.body.status);
               console.log(req.body.planname);
               console.log(req.body.userid);
               console.log(req.body.paymentmethod);
               
               
               payments.transactionid = req.body.transactionid;
               payments.price = req.body.price;
//               payments.epiormovid = req.body.epiormovid;
               payments.planid = req.body.planid;
               payments.planname = req.body.planname;
//               payments.epimovname = req.body.epimovname;
               payments.userid = req.body.userid;
               payments.status = req.body.status;
               payments.paymentmethod = req.body.paymentmethod;
               
	
                console.log(payments);
		payments.save(function(err, payments){
                console.log(payments)
//                if(payments.status == "approved"){
                   
                    if(payments.status === "Completed" || "approved" || "Submitted For Settlement"){
                    PaymentStatus.find({'userid': req.body.userid}, function(err, paymentst) {
                        console.log("+===========================================+++++++");
                        console.log(paymentst);
                        console.log(paymentst[0].status);
                        paymentst[0].status = '1';
                        paymentst[0].userid = paymentst[0].userid;
                        paymentst[0].save(function(err,paymentstu) {
                            if (err){
                                console.log("iffffffffffffffffffffffffffffff");
                                console.log(err);
                                res.send({"error" : 1,"message" : "Error"});
                            }else{
                                Plan.findById({_id:req.body.planid}, function(err, post){
                            res.json({"error":0,"message":'Payment Successful!','data':payments,'status':paymentstu,"plan":post});
                                });
                                }
                        })
                        
//                        res.json({error : 0 , payment : payments , message: 'Payment Successful!'});
                    });
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