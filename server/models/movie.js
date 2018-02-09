var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        thumbnail: { type: String, required: '{PATH} is required!'},
        video: { type: String, required: '{PATH} is required!'},
        movie_duration: { type: String, required: '{PATH} is required!'},
        categoryid : { type: String, required: '{PATH} is required!'},
        subcategoryid : { type: String},
        trailer: { type: String, required: '{PATH} is required!'},
        category : { type: String, required: '{PATH} is required!'},
        actors : { type: String, required: '{PATH} is required!'},
        type : { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

movieSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Movie', movieSchema);