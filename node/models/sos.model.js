var mongoose = require('mongoose');
var mongooseIncrement = require('mongoose-increment');
var increment = mongooseIncrement(mongoose);

module.exports = mongoose.model('esim_sos', 
mongoose.Schema({
    sos_id: { type: String, required: true },
    sos_name: { type: String, required: true },
    sos_owner: { type: String },
    sos_emailId:{type:String},
    created_date: { type: Date, default: Date.now },
    sos_description: { type: String },
    created_by: { type: String }
    
})
);


