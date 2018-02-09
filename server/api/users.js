/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var User = require('../models/user');
var uuid = require('node-uuid');
var fs = require('fs');
nodemailer = require('nodemailer');
smtpTransport = require("nodemailer-smtp-transport");
var http = require('http');
var request = require('request');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());
var randnumber = makeid();
// var crypto = require('crypto');
// bcrypt = require('bcrypt-nodejs');

// async = require('async');

// Users API
module.exports = function(apiRouter,passport,transporter,s3,randomString,userupload) {
    
    
    
//**********************************Admin Add User******************************************************

    apiRouter.get('/users', function(req, res) {
        console.log("users");
        User.find({}, function(err, users) {
            console.log(users);
            if (err)
                res.send(err);

            res.send(users);
        }).sort({ created_at : -1 });
    });

apiRouter.post('/adminusers', function(req, res) {
    console.log(req.body);
    if(req.body.image == ''){
            User.register(new User({
            
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        }), req.body.password, function(err, user) {
            console.log(user);
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
                res.send("You have successfully added user");
            }

        });
    }else{
         User.register(new User({
            image : req.body.image,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
          
        }), req.body.password, function(err, user) {
            console.log(user);
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
                res.send("You have successfully added user");
            }

        });
    }
    })
    
    
    apiRouter.post('/deleteuser', function(req, res) {
        User.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted!'});
        })
    });

//***************************************************************************************************
apiRouter.post('/users', function(req, res) {
    
    if(req.body.image == ''){
            User.register(new User({
            image : req.body.image,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        }), req.body.password, function(err, user) {
            console.log(user);
            if (err) {
                console.error(err.message);
//                res.send(err.message);
                res.json({"message":err.message,"error":"1"})
            } else {
                var userdata = {};
                userdata.username = user.username;
                userdata.email = user.email;
                userdata.phone = user.phone;
                userdata.role = user.role;
                userdata.image = user.image;
                userdata.id = user._id;
                res.json({"message":"User Added Successfully","error":"0","data" : userdata});
            }

        });
    }else{
//    console.log(req.body.image);
    var img = req.body.image;
    buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""),'base64');
    console.log(buf);
     var data = {
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    s3.putObject(data, function(err, data){
        console.log("https://s3.us-east-2.amazonaws.com/springtv/"+randomString+".jpg");
        var pro_pic = "https://s3.us-east-2.amazonaws.com/springtv/"+randomString+".jpg";
        
        
        
        User.register(new User({
            image : pro_pic,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        }), req.body.password, function(err, user) {
            console.log(user);
            if (err) {
                console.error(err.message);
//                res.send(err.message);
                res.json({"message":err.message,"error":"1"})
            } else {
                var userdata = {};
                userdata.username = user.username;
                userdata.email = user.email;
                userdata.phone = user.phone;
                userdata.role = user.role;
                userdata.image = user.image;
                userdata.id = user._id;
                res.json({"message":"User Added Successfully","error":"0","data" : userdata});
            }

        });
    })
    }
    })
      apiRouter.post('/users_login_check', function(req, res) {
         console.log("request");
         console.log(req.body);
          User.findOne({'email': req.body.email}, function(err, user) {
              console.log("safsdfsdafdsf");
          console.log(user);
           //  console.log(user.random);
         //var rand =  user.random;
          res.json({"message" : "Random number" ,"error" : 0 , "user" : user.random});
       //  var randomnumber = req.body.random;
        // console.log(rand);
//         if(rand ==  randomnumber)
//          {
//              res.json({"message" : "Continue","error" : 0 });
//          }
//           else
//           {
//              // res.redirect('/logout');
//               res.send({"message" : "you are already loggedin..","error" : 1 });
//           }
          
        });  
    
     });
    
  
     apiRouter.post('/users/login', function(req, res) {
         passport.authenticate('local')(req, res, function() {
             var userdata = {};
             console.log("hiiiiiiiiiiiiiii1111112222");
             console.log(req.user.username);
             userdata.id = req.user._id;
             userdata.name = req.user.username;
             userdata.email = req.user.email;
             userdata.phone = req.user.phone;
             userdata.role = req.user.role;
             userdata.image = req.user.image;
               // res.json({"message" : "Login Successfully" ,"error" : 0 , "user" : userdata});
            User.findById({'_id': req.user._id}, function(err, user) {
                console.log(user);
            console.log("login set");
           var random_old=user.random;
           console.log(random_old);
           console.log("random_old");
            if (err){
                res.send(err);
            }else{
                console.log(user);
            user.random = makeid();
            user.random_old=random_old;
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "String not genrated"});
                }else{
                    console.log(user.random_old);
                res.send({"error":0,"message":'Login Successfully','data':user.random,"old":user.random_old,"user" : userdata});
            }
            })
        }
            
         });   
        });  
                
              //console.log(req.user)
                   // res.send("You have successfully login");
           
    });
    
     apiRouter.post('/fetchuserdeatils', function(req, res) {
         console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err){
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
        }
        });
    });
    
    
         apiRouter.post('/adminfetchuserdata', function(req, res) {
         console.log(req.body.path);
        User.findById({'_id': req.body.path}, function(err, user) {
            if (err){
//                res.send(err);
                 res.json({"message" : "Unable to fetch details","error" : 1 });
            }else{
            res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
        }
        });
    });
    
    
    
        apiRouter.post('/editusrdetails', function(req, res) {
        console.log(req.body);
        
        User.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.username = req.body.username;
            user.phone = req.body.phone;
            user.image = user.image;
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
    
    });
    
    
        
        apiRouter.post('/editusrID', function(req, res) {
        console.log(req.body);
        
        User.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            
            if (err){
                res.send(err);
            }else{
            user.username = req.body.username;
            user.phone = req.body.phone;
            user.image = req.body.image;
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
    
    });
    
    
    
    
    
    
    
    
    
    apiRouter.post('/user_register_fb_app', function(req, res) {

        console.log(req.body);
        User.findOne({'email': req.body.email}, function(err, user) {
            console.log(user);
        
            if (user) {
                if (!err && user.email === req.body.email) {
                    console.log("harman1111");
                    console.log(user.email);
                    console.log(req.body.email);
                    //update user info
                    User.findById({'_id': user._id}, function(err, userall) {
                        console.log("find");
                        console.log(userall);
                        if (err)
                            res.send(err);
                        console.log(err);
                        userall.phone = req.body.phone;
                        userall.role = "user";
                        userall.username = req.body.username;
                        userall.facebook_id = req.body.facebook_id;
                        console.log(userall.facebook_id);
//                        userall.email = req.body.email;
                        userall.image = req.body.profile_picture;
                        console.log("data");
                        console.log(userall.role);
                        console.log(userall.phone);
                        console.log(userall.image);
                        console.log(userall.username);
                        var random_old=user.random;
                        console.log(random_old);
                        console.log("random_old");
                        userall.random = makeid();
                        userall.random_old=random_old;
//                        console.log(userall.email);
                        // user.password = req.body.password;
                        userall.save(function(err,userall) {
                            if (err){
                                console.log("if");
                                res.send({'error' : 1,'message':'Please Try Again!','data' : ''});
                            }else{
                            console.log("else");
                            res.json({'error' : 0,'message':'Welcome!','data' : userall});
                        }
                        })
                    });

                }
         
            } else {
//                console.log('else');
//                        User.register(new User({
//                            username: req.body.username,
//                            role: 'user',
//                            email: req.body.email,
//                            image : req.body.profile_picture,
//                            facebook_id : req.body.facebook_id,
//                            phone : req.body.phone,
//                           
//                        }), req.body.password, function(err, user) {
//                            console.log(user);
//                            var userdata = {};
//                            userdata.username = user.username;
//                            userdata.email = user.email;
//                            userdata.phone = user.phone;
//                            userdata.role = user.role;
//                            userdata.image = user.image;
//                            userdata.id = user._id;
//                            if (err) {
//                                console.log("if");
//                                console.error(err.message);
//                                res.send({'error' : 1,'message':'Please Try Again!','status' : false,'data' : ''});
//                            } else {
//                                console.log("else");
//                                // res.send(user);
//                   res.json({'error' : 0,'message' : "You have successfully added user by fb", 'status' : true, 'data' : user });
//                            }
//                        });
                            User.register(new User({
                            username: req.body.username,
                            role: 'user',
                            email: req.body.email,
                            image : req.body.profile_picture,
                            facebook_id : req.body.facebook_id,
                            random : makeid(),
                            phone : req.body.phone,
                        }), req.body.password, function(err, userall) {
                            console.log(userall);
                            
                            if (err) {
                                console.error(err.message);
                                res.send(err.message);
                            } else {
                                var userdata = {};
                                userdata.username = userall.username;
                                userdata.email = userall.email;
                                userdata.phone = userall.phone;
                                userdata.role = userall.role;
                                userdata.random = userall.random;
                                userdata.image = userall.image;
                                userdata.id = userall._id;
                                // res.send(user);
                                res.send({'error' : 0,'message' : "Welcome!", 'status' : true, 'data' : userdata });
                            }
                        });

            }
        });
    });
//    apiRouter.post('/uploaduserimage',userupload.array('file',3), function(req, res, next) {
//       // console.log(req.body);
//        console.log(req);
//        res.send(req.files);
//    });
    
    apiRouter.post('/post_user_image_app', function(req, res) {
    if(req.body.user_id == null)
    {
        res.json({'message' : "No user available", 'status' : false, 'data' : "" });
        return false;
    }
    var user_id = req.body.user_id;
    var pic = req.body.profile_picture;

     buf = new Buffer(pic.replace(/^data:image\/\w+;base64,/, ""),'base64');
     var data = {
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    s3.putObject(data, function(err, data){
        console.log("https://s3.us-east-2.amazonaws.com/springtv/"+randomString+".jpg");
        var pro_pic = "https://s3.us-east-2.amazonaws.com/springtv/"+randomString+".jpg";
        if (err) { 
          console.log(err);
          console.log('Error uploading data: ', data); 
        } else {
            User.findById(user_id, function(err, user) {
                if(err){
                    
                    
                    res.json({'message' : "Unable to update profile Image.", 'status' : false, 'data' : "" , "error" : 1});
                    
                }else{
                       user.image = pro_pic;
                       user.save(function(err) {
                                res.json({'message' : "Profile image updated.", 'status' : true, 'data' : pro_pic ,"error" : 0});
                            });
                        }
              })
          console.log('succesfully uploaded the image!');
        }
    });
    
    
    
    
    
//    var base64Data = pic.replace(/^data:image\/png;base64,/, "");
//    //console.log(base64Data);
//    var img_base_name = uuid.v4() + ".png";    
//   // console.log(img_base_name);
//    //var res=userupload.array(img_base_name);
//    // console.log(res);
//     
//    //var imageName = 'public/admin/uploads/players/' + img_base_name;
//    //var imageName = 'https://s3.console.aws.amazon.com/s3/buckets/springtv/' + img_base_name;
//  //  console.log(imageName);
//    fs.writeFile(img_base_name, base64Data, 'base64', function(err) {
//        console.log(err);
////        if(err)
////        {
////            res.json({'message' : "Upload Error", 'status' : false, 'data' : err });
////            return false;
////        }
////                User.findById(user_id, function(err, user) {
////                        user.image = img_base_name;
////                        user.save(function(err) {
////                                res.json({'message' : "Profile image updated.", 'status' : true, 'data' : img_base_name });
////                            });
////                })
//});

});
    
    
    
    
    
apiRouter.post('/change_password_app', function(req, res) {
    passport.authenticate('local')(req, res, function() {
//     User.comparePassword('123Password', function(err, isMatch) {
//        if (err) throw err;
//        console.log('123Password:', isMatch); // -&gt; 123Password: false
//    });
//
    console.log(res);
        console.log(req.body);
         if (req.body.new_password !== req.body.confirm) {
            res.json({'error' : 1 , 'message' : "Password and confirm password do not match.", 'status' : false});
           
         }else{
        User.findOne({'_id': req.body.id}, function(err, sanitizedUser) {
        console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.new_password, function() {
                sanitizedUser.save();
                res.json({'error' : 0 , 'message' : "Password has been Changed", 'status' : true});
            });
        } else {
            res.send({'error' : 1 , 'message' : "User does not exist", 'status' : false});
        }
    
    });
         }

    });
});

apiRouter.post('/change_passw', function(req, res) {
        console.log("api");
        console.log(req.body);
     
        User.findOne({'salt': req.body.salt}, function(err, sanitizedUser) {
        console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.password, function() {
                sanitizedUser.save();
                res.send({message:"Password reset Successfully"});
            });
        } else {
            res.json({message:"Error"});
        }
    
    });
});        



    apiRouter.post('/uploaduserimage',userupload.array('file',3), function(req, res, next) {
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

apiRouter.post('/forgetpass', function(req, res) {
        
        console.log(req.body);
//        return false;
        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, user) {
            console.log("Hii forget pass");
            console.log(user);
                if (user) {
                    console.log(user.email);
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/resetpassword?id=" + user.salt;//create a url of the host server
                var mailOptions = {
                    from: 'rakeshmoyal@avainfotech.com',
                    to: user.email,
                    subject: 'Forgot Password',
                    html: "Hello " + user.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                         res.json({"error" : 1 ,"message" : "Email has not been sent!"});
                    } else {
                        res.json({"error" : 0 ,"message" :"Email has been sent please check your email"});
                    }
                });
            } else {
                res.json({"error" : 2 , "message" :"Email has not been registered!"});
            }

    });

    });
    apiRouter.post('/forgetpassword', function(req, res) {
        
        console.log(req.body);
//        return false;
        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, user) {
            console.log("Hii forget pass");
            console.log(user);
                if (user) {
                    console.log(user.email);
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/admin/resetpassword?id=" + user.salt;//create a url of the host server
                var mailOptions = {
                    from: 'rakeshmoyal@avainfotech.com',
                    to: user.email,
                    subject: 'Forgot Password',
                    html: "Hello " + user.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                         res.json({"error" : 1 ,"message" : "Email has not been sent!",data:user});
                    } else {
                        res.json({"error" : 0 ,"message" :"Email has been sent please check your email",data:user});
                    }
                });
            } else {
                res.json({"error" : 2 , "message" :"Email has not been registered!",data:user});
            }

    });

    });
    
        apiRouter.post('/editusrdetailsweb', function(req, res) {
        console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            console.log("harmannnnn");
            console.log(user);
            if (err){
                res.send(err);
            }else{
            user.username = req.body.username;
            user.phone = req.body.phone;
            user.image = req.body.image;
         
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'User updated!','data':user});
            }
            })
        }
        });
    
    });
     apiRouter.post('/changePassword', function(req, res){
                 console.log("hello");
//                console.log(req.body);
//                return false;   
 passport.authenticate('local')(req, res, function() {
      
      console.log('ettttttttttttt');
//                      res.json({"message" : "password matched" ,"error" : 0 , "user" : req.user});
               
               User.findOne({"email":req.body.email }, function (err, user) {
//                   console.log(user);
//                   return false;
                    if(err) { res.send(err); 
                           res.json({"error" : 1 ,"message" : "Email has not been found!"});
                        return false;
                    } else{
                        console.log(user);
//                        console.log(abcd);
//                        return false;
                        user.setPassword(req.body.newpassword,function(err,user) {
                            console.log("happppppppppppppp");
                            console.log(user);
//                            return false;
			user.save();
                        console.log("password changed!");
                        res.json({"message" : "password changed" ,"error" : 0});
			if(err) {  
                            res.json({"error" : 1 ,"message" : "Password can not be changed!"});
                        }
                                 
                            
                        
//                        alert("password changed!");
//			res.json( {"message": 'PASSWORD CHANGED!'});  
              
              });
          }
          });
          
          });
          
          });
          
//        apiRouter.post('/sms', function(req, res) {
//               client.messages.create({ 
//                    to: "+919815993122", 
//                    from: "+12054330936 ", 
//                    body: randnumber, 
//                }, function(err, message) { 
//                    console.log(message.sid); 
//                    console.log(message.to);
//                    console.log(message.from);
//                    res.json({"message" : "message send" ,"error" : 0});
//                });
//              });
              
//        apiRouter.post('/verify', function(req, res) {
//          if(randnumber == req.body.otp){
//              
//          }         
//              });



 apiRouter.post('/addpending', function (req, res) {
//        console.log('jmnjm');
//        console.log(req.body);
        console.log("test");
        User.find({ 'phone': req.body.phone }, function (err, user) {
            if (err) {
                res.json({ 'status': false, 'message': err });
            } else {
                        var dataString = 'api_key=sNsfu8Cz2PqRvXRDiN80pm73pI02s6Qt&via=sms&phone_number=' + req.body.phone + '&country_code='+req.body.ccode;

                        var options = {
                            url: 'https://api.authy.com/protected/json/phones/verification/start',
                            method: 'POST',
                            body: dataString
                        };

                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
//                                console.log(body);
//                                console.log(response);
                                if (JSON.parse(body).success == true) {
                                    res.json({ 'status': true, 'message': 'OTP Sent' });
                                }
                               else {
                                console.log("bb");
                            }
                        }
                    }
                        request(options, callback);
//                    res.send({ 'status': true });
            }
        });
            
    });
   
    apiRouter.post('/checkmobile', function (req, res) {
        console.log("mobile");
        console.log(req.body);
    
       User.find({'phone': req.body.phone}, function(err, user) { 
        res.send(user);
    });
    });
    
apiRouter.post('/checkcode', function (req, res) {
          var options = {
                    url: 'https://api.authy.com/protected/json/phones/verification/check?api_key=sNsfu8Cz2PqRvXRDiN80pm73pI02s6Qt&phone_number=' + req.body.phone + '&country_code='+ req.body.ccode +'&verification_code=' + req.body.code
                };

                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        if (JSON.parse(body).success == true) {
                           User.register(new User({
                            role: 'user',
                            email : req.body.email,
                            phone :req.body.phone,
                        }), req.body.password, function(err, userall) {
                            console.log(userall);
                            if (err) {
                                console.error(err.message);
                                res.send(err.message);
                            } else {
                                res.json({'message' : "You have successfully added user", 'status' : true, 'data' : userall });
                            }
                        });
                        }
                    } else {
                        res.json({ 'status': false, 'message': 'Incorrect Verification Code' });
                    }
                }
                request(options, callback);     

      })
      
      apiRouter.post('/checkcodelogin', function (req, res) {
          var options = {
                    url: 'https://api.authy.com/protected/json/phones/verification/check?api_key=sNsfu8Cz2PqRvXRDiN80pm73pI02s6Qt&phone_number=' + req.body.phone + '&country_code='+ req.body.ccode +'&verification_code=' + req.body.code
                };

                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        if (JSON.parse(body).success == true) {
                  User.find({'phone': req.body.phone}, function(err, user) {
                      console.log("hello");
                      console.log(user[0]._id);
                       var userdata = {};
             console.log("hiiiiiiiiiiiiiii1111112222");
             //console.log(req.user.username);
             userdata.id = user[0]._id;
             userdata.name = user[0].name;
             userdata.email = user[0].email;
             userdata.phone = user[0].phone;
             userdata.role = user[0].role;
             userdata.image = user[0].image;
                //res.send({"message" : "Login Successfully" ,"error" : 0 , "user" : user});
            User.findById({'_id': userdata.id}, function(err, user) {
                console.log(user);
            console.log("login set");
           var random_old=user.random;
           console.log(random_old);
           console.log("random_old");
            if (err){
                res.send(err);
            }else{
                console.log(user);
            user.random = makeid();
            user.random_old=random_old;
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "String not genrated"});
                }else{
                    console.log(user.random_old);
                res.send({"error":0,"message":'Login Successfully','data':user.random,"old":user.random_old,"user" : userdata});
            }
            })
        }
            
         });   
                        });
                             }
                    } else {
                        res.json({ 'status': false, 'message': 'Incorrect Verification Code' });
                    }
                
                }
                request(options, callback);     

      })
}