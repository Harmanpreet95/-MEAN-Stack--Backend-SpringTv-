var mongoose = require('mongoose');

var episodeSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
        season_id : { type: String, required: '{PATH} is required!'},
        serial_id : { type: String, required: '{PATH} is required!'},
        season_name : { type: String, required: '{PATH} is required!'},
        serial_name : { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        thumbnail: { type: String, required: '{PATH} is required!'},
        video: { type: String, required: '{PATH} is required!'},
        episode_duration : { type: String},
        likes : { type: Number, default: 2 }, 
        countlikes : { type: Number, default: 0 },
        countdislikes : { type: Number, default: 0 },
        trailer: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

episodeSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Episode', episodeSchema);