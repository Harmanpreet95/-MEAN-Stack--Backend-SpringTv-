var mongoose = require('mongoose');

var actorSchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
        image : { type: String },
        description : { type: String },
        movie_id:{ type: String },
        movie_thumb: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

actorSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Actor', actorSchema);