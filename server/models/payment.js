var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
	transactionid: { type: String, required: '{PATH} is required!'},
        price : { type: String },
        planid : { type: String },
        planname : { type: String },
        status : { type: String },
        userid : { type: String },
        paymentmethod : { type: String },
        currency : { type: String },
        paymentmethod : { type: String },
        paymentmethod : { type: String },
        paymentmethod : { type: String },
        paymentmethod : { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

paymentSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);