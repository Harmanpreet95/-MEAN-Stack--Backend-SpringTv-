var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        EpiLikedislike  = require('./models/episodelikedislike');
        Page = require('./models/page'),
        Video = require('./models/video'),
        Buynow = require('./models/buynow'),
        Order = require('./models/order'),
        Download = require('./models/download'),
        PaymentStatus = require('./models/paymentstatus'),
        Plan = require('./models/plan'),
        Team = require('./models/team'),
        News = require('./models/news'),
        Actor = require('./models/actor'),
        Rate = require('./models/rate'),
        Payment = require('./models/payment'),
        Season = require('./models/season'),
        Likedislike = require('./models/likedislike'),
        Subcategory = require('./models/subcategory'),
        Episode = require('./models/episode'),
        Serial = require('./models/serial'),
        Category = require('./models/category'),
        nodemailer = require('nodemailer'),
        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        router = express.Router()
        aws = require('aws-sdk'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        dateNow = Date.now(),
        sr = require('simple-random'),
        serialize = require('node-serialize'),
        randomString = sr();



var transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
        user: "AKIAJVXBUELTWRZ7PZCQ",
        pass: "Ap69lKNzBoU1WgAxvpQqilM09x/KEfv97B1fgX2jYH+r"
    }
});


aws.config.update({
    secretAccessKey: 'Js+yvvIsmJa7TRosRUqxQbubCJEqgCWSovOzmlsm',
    accessKeyId: 'AKIAIDLUZANRGPDNTZKQ'
});

var key = randomString + ".jpg";
var s3 = new aws.S3({
    endpoint: 'https://s3.us-east-2.amazonaws.com',
    region: 'us-east-2',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: {
        Bucket: 'springtv',
        Key: key
    }
});
var userupload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'springtv',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'profilepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});
//var userupload = multer({
//    storage: multerS3({
//        s3: s3,
//        bucket: 'springtv',
//        key: function(req, file, cb) {
//            console.log(file);
//            //var flname = file.originalname;
//            cb(null, 'profilepic/' + dateNow + '' + file); //use Date.now() for unique file keys
//        }
//    })
//});
module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/videos')(apiRouter, serialize);
  
    require('./api/serials')(apiRouter,s3, randomString,userupload);
    require('./api/plans')(apiRouter);
     require('./api/buynow')(apiRouter);
    require('./api/teams')(apiRouter, passport, transporter, s3, randomString, userupload);
    require('./api/news')(apiRouter, passport, transporter, s3, randomString, userupload);
    require('./api/paymentstatus')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/downloads')(apiRouter);
    require('./api/rates')(apiRouter);
    require('./api/actors')(apiRouter);
    require('./api/payments')(apiRouter);
    require('./api/orders')(apiRouter);
    require('./api/seasons')(apiRouter,s3, randomString,userupload);
    require('./api/episodes')(apiRouter,s3, randomString,userupload);
    require('./api/categories')(apiRouter,s3, randomString,userupload);
    require('./api/subcategories')(apiRouter,s3, randomString,userupload);
    require('./api/likedislikes')(apiRouter,s3, randomString,userupload);
//        require('./api/adminusers')(apiRouter, passport,transporter,s3,randomString);
    require('./api/users')(apiRouter, passport, transporter, s3, randomString, userupload);
    // home route
    router.get('/', function(req, res) {
        if (req.user) {
            res.render('home/myaccount', {user: req.user});
        } else {
            res.render('index', {user: ''});
        }
    });
    router.get('/login', function(req, res) {
        if (req.user) {
            res.render('home/myaccount', {user: req.user});
        } else {
            res.render('home/login', {user: ''});
        }
    });

    router.get('/forgotpassword', function(req, res) {
        res.render('home/forgotpassword');
    });
    router.get('/admin/forgotpassword', function(req, res) {
        res.render('admin/forgotpassword');
    });
    router.get('/myaccount', function(req, res) {
        if (req.user) {
            res.render('home/myaccount', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/editprofile', function(req, res) {
        if (req.user) {
            res.render('home/editprofile', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/changepassword', function(req, res) {
        if (req.user) {  
            res.render('home/changepassword', {user: req.user});
        }else{
            res.redirect('/login');
        }    
    });
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/action', function(req, res) {
        if (req.user) {
            res.redirect('/action');
        } else {
            res.redirect('/login');
        }
    });
    router.get('/contactus', function(req, res) {
        
            res.render('home/contactus');
      
           
    });
    router.get('/myorder', function(req, res) {
        if (req.user) {
            res.render('home/cart', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/actor', function(req, res) {
        if (req.user) {
            res.render('home/actor', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/cart', function(req, res) {
        if (req.user) {
               res.render('home/cart', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/team', function(req, res) {
        if (req.user) {
            res.render('home/team', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/news', function(req, res) {
        if (req.user) {
            res.render('home/news', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/movie/:id', function(req, res) {
        if (req.user) {
          res.render('home/movie', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    

    router.get('/latest', function(req, res) {
    
        if (req.user) {
            res.render('home/latest', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/tvseries', function(req, res) {
        if (req.user) {
            res.render('home/tvserial', {user: req.user});        
        } 
        else {
            res.redirect('/login');
        }
    });
    
  
     router.get('/movie_detail/:id', function(req, res) {
        if (req.user) {
            res.render('home/movie_detail', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
        router.get('/episode/:id', function(req, res) {
        if (req.user) {
            res.render('home/episode', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/fullmovie/:id', function(req, res) {
        if (req.user) {
            res.render('home/fullmovie', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/episode_detail/:id', function(req, res) {
        if (req.user) {
            res.render('home/episode_detail', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/fullepisode/:id', function(req, res) {
        if (req.user) {
            res.render('home/fullepisode', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/news_detail/:id', function(req, res) {
        if (req.user) {
            res.render('home/news_detail', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/order', function(req, res) {
        if (req.user) {
            res.render('home/order', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/billing/:id', function(req, res) {
        if (req.user) {
            res.render('home/billing', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/selectplan', function(req, res) {
          if (req.user) {
            res.render('home/selectplan', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
      router.get('/payment/:id', function(req, res) {
          if (req.user) {
            res.render('home/payment', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    
     router.get('/payment_1/:id', function(req, res) {
          if (req.user) {
            res.render('home/payment_1', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/paystatus', function(req, res) {
        if (req.user) {
          res.render('home/paystatus', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    router.get('/billstatus', function(req, res) {
        if (req.user) {
          res.render('home/billstatus', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
      router.get('/aboutus', function(req, res) {
          if (req.user) {
            res.render('home/aboutus', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
     router.get('/privacyandpolicy', function(req, res) {
          if (req.user) {
            res.render('home/privacyandpolicy', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
      router.get('/termsandconditions', function(req, res) {
          if (req.user) {
            res.render('home/termsandconditions', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });

    router.get('/admin/register', function(req, res) {
        res.render('admin/register');
    });

    router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });

    router.post('/register', function(req, res) {

        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }

            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
        });
    });

    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/admin/dashboard');
    });

    router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    router.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/login'
            }));


    router.get('/resetpassword', function(req, res) {
        //res.render('home/forgetpassword');
        console.log(req.query);
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
                res.render('404');
            } else {
                res.render('home/resetpassword', {salt: req.query.id});
            }
        });
    });
    router.get('/admin/resetpassword', function(req, res) {
        //res.render('home/forgetpassword');
        console.log(req.query);
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
//                alert("if");
                res.render('home/resetpassword');
            } else {
                res.render('admin/resetpassword', {salt: req.query.id});
            }
        });
    });


//        router.get('/forgotpassword', function(req, res) {
//            //res.render('home/forgetpassword');
//            console.log(req.query);
//            User.findOne({'salt': req.query.id}, function(err, user) {
//                console.log(user);
//                if (user==null) {
//                    res.render('404');
//                } else {
//                    res.render('home/forgetpassword',{salt: req.query.id});
//                }
//            });
//        });
//    

    app.use(function(req, res, next) {
        res.status(404);

        res.render('404');
        return;
    });

};

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.email === 'harman@avainfotech.com') {
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}