var mongoose = require('mongoose');

var subcategorySchema = new mongoose.Schema({
        category_id : { type: String, required: '{PATH} is required!'},
	category: { type: String, required: '{PATH} is required!'},
        subcategory : { type: String, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

subcategorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Subcategory', subcategorySchema);