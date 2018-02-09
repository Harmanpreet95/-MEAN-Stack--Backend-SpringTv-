

var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');
//var bcrypt = require('bcrypt-nodejs');


var User = new mongoose.Schema({
	email: {
		type: String, 
		unique: true
	},
        image:{type:String},
	username:{type:String},
        phone:{type:Number,unique: true},
        random:{type:String},
        facebook_id:{ type: String},
        facebook_token:{ type: String},    
//	password:{type:String, required:'{PATH} is required!'},
	role:{type:String,required:'{PATH} is required!'},
        resetPasswordToken: { type: String},
        resetPasswordExpires: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field



User.plugin(passportLocalMongoose, { usernameField: 'email' });
//User.methods.comparePassword = function(old_password, hash, salt , user){
//    console.log("harman");
//    console.log(hash);
//    console.log(salt);
//    console.log(old_password);
//}
    User.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});
//User.comparePassword = function(candidatePassword, cb) {
//    console.log("model");    console.log("compare");
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//        if (err) return cb(err);
//        cb(null, isMatch);
//    });
//    }
module.exports = mongoose.model('User', User);/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


