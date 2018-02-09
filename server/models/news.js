var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
        description : { type: String, required: '{PATH} is required!'},
        image:{ type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

newsSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('News', newsSchema);