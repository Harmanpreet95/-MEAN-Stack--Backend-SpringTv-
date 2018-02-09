var mongoose = require('mongoose');

var planSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	days: { type: Number, default: 0 , required: '{PATH} is required!' },
        price: { type: Number, default: 0 , required: '{PATH} is required!'},
        planimage : { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

planSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Plan', planSchema);