var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	transactionid: { type: String, required: '{PATH} is required!'},
        price : { type: String },
        quantity:{ type: String },
        itemid : { type: String },
        itemname : { type: String },
        status : { type: String },
        userid : { type: String },
        paymentmethod : { type: String },
        s_username: { type: String, reuired: '{PATH} is required!'},
        s_phone: { type: String, reuired: '{PATH} is required!'},
        s_address: { type: String, reuired: '{PATH} is required!'},
        s_city: { type: String, reuired: '{PATH} is required!'},
        s_state: { type: String, reuired: '{PATH} is required!'},
        s_country: { type: String, reuired: '{PATH} is required!'},
        s_zip: { type: String, reuired: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

orderSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Order', orderSchema);