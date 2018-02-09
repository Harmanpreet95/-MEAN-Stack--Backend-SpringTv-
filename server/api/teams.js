/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Team = require('../models/team');
var uuid = require('node-uuid');
var fs = require('fs');
nodemailer = require('nodemailer');
smtpTransport = require("nodemailer-smtp-transport");
// var crypto = require('crypto');
// bcrypt = require('bcrypt-nodejs');

// async = require('async');

// Users API
module.exports = function(apiRouter,passport,transporter,s3,randomString,userupload) {
    
    
    
//**********************************Admin Add User******************************************************

    apiRouter.get('/teams', function(req, res) {
        console.log("teams");
        Team.find({}, function(err, teams) {
            console.log(teams);
            if (err)
                res.send(err);

            res.json({data:teams});
        }).sort({ created_at : -1 });
    });

apiRouter.post('/adminteams', function(req, res) {
    console.log(req.body);
    if(req.body.image == ''){
            var team = new Team();
		team.name = req.body.name;
		team.role = req.body.role;
                team.save(function(err, team){
            if (err) {
               console.error(err.message);
                res.send(err.message);
            } else {
                res.json({message :"You have successfully added team member",data:team});
            }

        });
    }else{
          var team = new Team();
		team.name = req.body.name;
                team.image=req.body.image;
		team.role = req.body.role;
                team.save(function(err, team){
            if (err) {
               console.error(err.message);
                res.send(err.message);
            } else {
//                var userdata = {};
//                userdata.username = user.username;
//                userdata.email = user.email;
//                userdata.phone = user.phone;
//                userdata.role = user.role;
//                userdata.image = user.image;
                res.json({message :"You have successfully added team member",data:team});
            }

        });
    }
    })
    
    
    apiRouter.post('/deleteteam', function(req, res) {
        Team.remove({
            _id: req.body.id
        }, function(err, team) {
            if (err)
                res.send(err);     
            res.json({message: 'Team Member deleted!'});
        })
    });

//***************************************************************************************************

    
         apiRouter.post('/adminfetchteamdata', function(req, res) {
         console.log(req.body.path);
        Team.findById({'_id': req.body.path}, function(err, team) {
            if (err){
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : team});
        }
        });
    });
    
    
    
    
    
        
        apiRouter.post('/editteamID', function(req, res) {
        console.log(req.body);
        
        Team.findById({'_id': req.body.id}, function(err, team) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            team.name = req.body.name;
            team.role = req.body.role;
            team.image = req.body.image;
            console.log(team.image);
         
            team.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your Account Has been updated successfully','data':team});
            }
            })
        }
        });
    
    });
    
    
    
    
    
    
    
    
    
   



    apiRouter.post('/uploadteamimage',userupload.array('file',3), function(req, res, next) {
        console.log("upload");
        console.log(req.body);
        console.log(req.files);
        
        res.send(req.files);
        
    });



//apiRouter.post('/forgetpass', function(req, res) {
//        
//        console.log(req);
//        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, user) {
//            console.log("Hii forget pass");
//            console.log(user);
//                if (user) {
//                    console.log(user.email);
//                host = req.get('host');//remember the server (i.e host) address
//                link = "http://" + req.get('host') + "/forgotpassword?id=" + user.salt;//create a url of the host server
//                var mailOptions = {
//                    from: 'harman@avainfotech.com',
//                    to: user.email,
//                    subject: 'Forgot Password',
//                    html: "Hello " + user.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
//                };
//                transporter.sendMail(mailOptions, function(error, info) {
//                    if (error) {
//                        console.log(error);
//                         res.json({"error" : 1 ,"message" : "Email has not been sent!"});
//                    } else {
//                        res.json({"error" : 0 ,"message" :"Email has been sent please check your email"});
//                    }
//                });
//            } else {
//                res.json({"error" : 2 , "message" :"Email has not been registered!"});
//            }
//
//    });
//
//    });

}