var mongoose = require('mongoose');

var episodelikedislikeSchema = new mongoose.Schema({
        user_id: { type: String, required: '{PATH} is required!'},
	episode_id: { type: String, required: '{PATH} is required!'},
        status: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

episodelikedislikeSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('EpiLikedislike', episodelikedislikeSchema);