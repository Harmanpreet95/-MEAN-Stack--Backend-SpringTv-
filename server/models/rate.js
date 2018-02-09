var mongoose = require('mongoose');

var rateSchema = new mongoose.Schema({
	userid: { type: String, required: '{PATH} is required!'},
        movieid : { type: String },
        star:{ type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

rateSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Rate', rateSchema);