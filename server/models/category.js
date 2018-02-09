var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	category: { type: String, required: '{PATH} is required!'},
        subcategory : { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

categorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Category', categorySchema);