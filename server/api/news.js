/**
 * @author harman
 * @description movie
 * @type type
 */

var News = require('../models/news');
var uuid = require('node-uuid');
var fs = require('fs');
nodemailer = require('nodemailer');
smtpTransport = require("nodemailer-smtp-transport");
var limit=4;
// Posts API



module.exports = function(apiRouter,passport,transporter,s3,randomString,userupload) {

	 apiRouter.get('/news', function(req, res) {
        console.log("news");
        if (req.body.s === "1") {
              console.log("s is 1");
            limit = limit + 4;
        } else {
            console.log("s is 0");
            limit = limit + 0;
        }
        News.find({}, function(err, news) {
            console.log(news);
            if (err)
                res.send(err);

            if (news.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({data:news,"loadmore":loadmore});
        }).sort({ created_at : -1 }).limit(limit);
    });
	
	apiRouter.post('/news', function(req, res) {
        console.log("news");
         if (req.body.s === "1") {
              console.log("s is 1");
            limit = limit + 4;
        } else {
            console.log("s is 0");
            limit = limit + 0;
        }
        News.find({}, function(err, news) {
            console.log(news);
            if (err)
                res.send(err);
            if (news.length >= limit) {
                var loadmore = 1;
            } else {
                var loadmore = 0;
            }
            res.json({data:news,"loadmore":loadmore});
        }).sort({ created_at : -1 }).limit(limit);
    });

    
    apiRouter.post('/addnews', function(req, res) {
    console.log(req.body);
    if(req.body.image == ''){
            var news = new News();
		news.title = req.body.title;
		news.description = req.body.description;
                news.save(function(err, news){
            if (err) {
               console.error(err.message);
                res.send(err.message);
            } else {
                res.json({message :"You have successfully added news",data:news});
            }

        });
    }else{
            var news = new News();
		news.title = req.body.title;
		news.description = req.body.description;
                news.image=req.body.image;
                news.save(function(err, news){
            if (err) {
               console.error(err.message);
                res.send(err.message);
            } else {
                res.json({message :"You have successfully added news",data:news});
            }

        });
    };
    
    });
    apiRouter.post('/deletenews', function(req, res) {
        News.remove({
            _id: req.body.id
        }, function(err, news) {
            if (err)
                res.send(err);
            res.json({message: 'News deleted!'});
        })
    });
    apiRouter.post('/adminfetchnewsdata', function(req, res) {
         console.log(req.body.path);
        News.findById({'_id': req.body.path}, function(err, news) {
            if (err){  
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : news});
        }
        });
    });
    apiRouter.post('/editnewsID', function(req, res) {
        console.log(req.body);
        
        News.findById({'_id': req.body.id}, function(err, news) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            news.title = req.body.title;
            news.description = req.body.description;
            news.image = req.body.image;
            console.log(news.image);
         
            news.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your News Has been updated successfully','data':news});
            }
            })
        }
        });
    
    });
    apiRouter.post('/uploadnewsimage',userupload.array('file',3), function(req, res, next) {
        console.log("upload");
        console.log(req.body);
        console.log(req.files);
        
        res.send(req.files);
        
    });
    };