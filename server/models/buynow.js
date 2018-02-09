var mongoose = require('mongoose');

var buynowSchema = new mongoose.Schema({
	movie_id: { type: String, required: '{PATH} is required!'},
	movie_name: { type: String, required: '{PATH} is required!'},
        movie_price: { type: String, reuired: '{PATH} is required!'},
        status : { type: String },
        d_status:{ type: String },
        userid : { type: String },
        transactionid: { type: String, required: '{PATH} is required!'},
        paymentmethod : { type: String },
        quantity: { type: String, reuired: '{PATH} is required!'},
        b_name: { type: String, reuired: '{PATH} is required!'},
        b_phone: { type: String, reuired: '{PATH} is required!'},
        b_address: { type: String, reuired: '{PATH} is required!'},
        b_city: { type: String, reuired: '{PATH} is required!'},
        b_state: { type: String, reuired: '{PATH} is required!'},
        b_country: { type: String, reuired: '{PATH} is required!'},
        b_zip: { type: String, reuired: '{PATH} is required!'},
        s_name: { type: String, reuired: '{PATH} is required!'},
        s_phone: { type: String, reuired: '{PATH} is required!'},
        s_address: { type: String, reuired: '{PATH} is required!'},
        s_city: { type: String, reuired: '{PATH} is required!'},
        s_state: { type: String, reuired: '{PATH} is required!'},
        s_country: { type: String, reuired: '{PATH} is required!'},
        s_zip: { type: String, reuired: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

buynowSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Buynow', buynowSchema);