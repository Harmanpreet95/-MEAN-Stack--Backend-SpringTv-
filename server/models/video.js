var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String},
        thumbnail: { type: String},
        video: { type: String},
        trailer: { type: String},
        category : { type: String},
        categoryid : {type: String},
        subcategoryid : {type: String},
        actors : { type: String},
         price:{type:String},
        type : { type: String},
        likes : { type: Number, default: 2 },
        countlikes : { type: Number, default: 0 },
        countdislikes : { type: Number, default: 0 },
        movie_duration : {type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

videoSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Video', videoSchema);