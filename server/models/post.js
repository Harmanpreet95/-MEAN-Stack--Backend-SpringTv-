var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        thumbnail: { type: String, required: '{PATH} is required!'},
//        video: { type: String, required: '{PATH} is required!'},
//        trailer: { type: String, required: '{PATH} is required!'},
//        category : { type: String, required: '{PATH} is required!'},
//        actors : { type: String, required: '{PATH} is required!'},
//        type : { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Post', postSchema);