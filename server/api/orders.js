/**
 * @author harman
 * @description movie
 * @type type
 */
var Video = require('../models/video');
var Order = require('../models/order');
var Buynow = require('../models/buynow');
var PaymentStatus = require('../models/paymentstatus');
// Posts API



module.exports = function(apiRouter,s3,randomString,userupload){
	
//	
	apiRouter.get('/orderslist', function(req, res){
		Buynow.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		});
	});

        apiRouter.post('/orderpaymentgateway', function(req, res){
           console.log(req.body);
               
               var order = new Buynow();
               console.log(req.body.transactionid);
               console.log(req.body.movie_price);
               console.log(req.body.movie_id);
//               console.log(req.body.status);
               console.log(req.body.movie_name);
               console.log(req.body.userid);
               console.log(req.body.paymentmethod);
               
               
               order.transactionid = req.body.transactionid;
               order.movie_price = req.body.movie_price;
//               payments.epiormovid = req.body.epiormovid;
               order.movie_id = req.body.movie_id;
               order.movie_name = req.body.movie_name;
               order.quantity = req.body.quantity;
//               payments.epimovname = req.body.epimovname;
               order.userid = req.body.userid;
               order.status = "Pending";
               order.paymentmethod = req.body.paymentmethod;
               
	
//                console.log(o_payments);
		order.save(function(err, ord){
                console.log(ord);
                res.json({error : 0 , data : ord});
            });
        });
        
        apiRouter.post('/deleteorder', function(req, res) {
        Buynow.remove({
            _id: req.body.id
        }, function(err, news) {
            if (err)
                res.send(err);
            res.json({message: 'Order deleted!'});
        });
    });
//                if(payments.status == "approved"){
         apiRouter.post('/fetchorderdetail', function(req, res){
		console.log(req.body);
		
                 Buynow.findById({_id:req.body.path}, function(err, post){
                    console.log("plandata::::::::::");
                    console.log(post);
                   res.json({"error":0,'data':post});
                    
                });
            });
            apiRouter.post('/fetchmyorder', function(req, res){
		console.log(req.body);
		
                 Buynow.find({userid:req.body.userid}, function(err, post){
                    console.log("myorder::::::::::");
                    console.log(post);
                   res.json({"error":0,'data':post});
                    
                });
            });
             apiRouter.post('/updateorder', function(req, res){
		console.log(req.body);
		
                Buynow.findById(req.body.id, function(err, paymentst){
                    console.log("update status::::::::::");
                    console.log(paymentst);
//                    console.log(paymentst[0].status);
             
                paymentst.status=req.body.status;
                if(req.body.d_status){
                    paymentst.d_status=req.body.d_status;
                }
                paymentst.save( function(err,status) {
                    if(err) {
                        res.send({"error" : 1,"message" : "Error"});
                    }else{
                        console.log(status);
                         res.json({"error":0,"message" : "Payment Status Updated",'data':status});
                    }
                     
                });
                   
                });
            });
            
             apiRouter.post('/updateordershipping', function(req, res){
                 console.log("Shipping Request");
		console.log(req.body);
		
                Buynow.findById(req.body.id, function(err, ship){
                    console.log("Shipping status::::::::::");
                    console.log(ship);
//                    console.log(paymentst[0].status);
                ship.b_name = req.body.s_name;
                ship.b_phone = req.body.s_phone;
                ship.b_address = req.body.s_address;
                ship.b_city = req.body.s_city;
                ship.b_state = req.body.s_state;
//               payments.epimovname = req.body.epimovname;
                ship.b_country = req.body.s_country;
                ship.b_zip = req.body.s_zip;
                
                ship.s_name = req.body.s_name;
                ship.s_phone = req.body.s_phone;
                ship.s_address = req.body.s_address;
                ship.s_city = req.body.s_city;
                ship.s_state = req.body.s_state;
//               payments.epimovname = req.body.epimovname;
                ship.s_country = req.body.s_country;
                ship.s_zip = req.body.s_zip;
                    ship.save( function(err,status) {
                    if(err) {
                        res.send({"error" : 1,"message" : "Error"});
                    }else{
                        console.log("res");
                        console.log(status);
                         res.json({"error":0,"message" : "Payment Status Updated",'data':status});
                    }
                     
                });
                   
                });
            });

	


};