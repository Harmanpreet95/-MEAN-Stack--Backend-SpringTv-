var mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
        serialid : { type: String, required: '{PATH} is required!'},
	season_name: { type: String, required: '{PATH} is required!'},
	price: { type: String, required: '{PATH} is required!'},
//        thumbnail: { type: String, required: '{PATH} is required!'},
//        trailer: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

seasonSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Season', seasonSchema);