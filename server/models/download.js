var mongoose = require('mongoose');

var downloadSchema = new mongoose.Schema({
	title: { type: String},
        season_id : { type: String},
        serial_id : { type: String},
        season_name : { type: String},
        serial_name : { type: String},
	description: { type: String},
        thumbnail: { type: String},
        video: { type: String},
        trailer: { type: String},
        episode_duration : { type: String},
        category : { type: String},
        categoryid : {type: String},
        subcategoryid : {type: String},
        actors : { type: String},
        type : { type: String},
        likes : { type: Number, default: 0 },
        movie_duration : {type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

downloadSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Download', downloadSchema);