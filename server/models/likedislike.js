var mongoose = require('mongoose');

var likedislikeSchema = new mongoose.Schema({
        user_id: { type: String, required: '{PATH} is required!'},
	movie_id: { type: String, required: '{PATH} is required!'},
        status: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

likedislikeSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Likedislike', likedislikeSchema);