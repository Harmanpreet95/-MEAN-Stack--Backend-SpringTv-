/**
 * @author harman
 * @description movie
 * @type type
 */
var Rate = require('../models/rate');
var Actor = require('../models/actor');
var Video = require('../models/video');
var Category = require('../models/category');
var SubCategory = require('../models/subcategory');
var ObjectID = require('mongodb').ObjectID;
var limit = 4;
// Posts API



module.exports = function(apiRouter){
	
	
	apiRouter.get('/ratesall', function(req, res){
		Rate.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		});
	});
 apiRouter.post('/ratesfind', function(req, res) {
    Rate.find({'movieid':req.body.movieid,'userid':req.body.userid}, function(err, rates) {
        console.log(rates);
        console.log(req.body);
        if (err) res.send(err);
        res.json({error : 0 , data : rates ,req : req.body.movieid});
    });  
 });
 
    apiRouter.post('/rates', function(req, res) {
        console.log(req.body);
//         if (req.body.s === "1") {
//            limit = limit + 4;
//             console.log(limit);
//        } else {
//            limit = limit + 0;
//        }
// PaymentStatus.find({'userid': req.body.userid}, function(err, paymentst) {
        Rate.find({'movieid':req.body.movieid,'userid':req.body.userid}, function(err, rates) {
            if (err)
                res.send(err);
//             if (actors.length >= limit) {
//                var loadmore = 1;
//            } else {
//                var loadmore = 0;
//            }
console.log(rates);
            console.log(rates.length);
            if(rates.length===0){
                console.log("new rating review :");
                var rate = new Rate();
                rate.movieid=req.body.movieid;
                rate.userid=req.body.userid;
                rate.star=req.body.star;
                rate.save(function(err, data){
                    if (err){
                                console.log("iffffffffffffffffffffffffffffff");
                                console.log(err);
                                res.send({"error" : 1,"message" : "Error"});
                            }else{
                                 res.json({"error":0,"message":'Review Added Successfully!','data':data});
                            }
                });
            }else{
                console.log("rating review update :");
                console.log(rates);
                console.log(rates[0].star);
                rates[0].star=req.body.star;
                rates[0].save(function(err,update) {
                            if (err){
                                console.log("iffffffffffffffffffffffffffffff");
                                console.log(err);
                                res.send({"error" : 1,"message" : "Error"});
                            }else{
                              console.log("elseeeeeeeeeeeeeeeeeeeeeeeeee");
                              console.log(update);
                              
                            res.json({"error":0,"message":'Review Updated Successfully!','data':update});
                        }
                        });
                
            }
//            return false;
//            res.json({error: 0, data: rates});
        });
    });
    
    
};