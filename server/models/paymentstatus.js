var mongoose = require('mongoose');

var paymentstatusSchema = new mongoose.Schema({
	userid: { type: String, required: '{PATH} is required!'},
        status: { type: Number, default: 0 },
       
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

paymentstatusSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('PaymentStatus', paymentstatusSchema);