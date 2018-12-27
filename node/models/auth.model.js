var mongoose = require('mongoose');

module.exports = mongoose.model('esim_user',

    new mongoose.Schema({

        user_id: { type: String, required: true ,lowercase:true ,trim:true },
        password: { type: String, required: true },
        firstName: { type: String, required: true ,lowercase:true ,trim:true},
        lastName: { type: String, required: true,lowercase:true ,trim:true },
        location: { type: String, required: true },
        mobileNo: { type: Number, required: true },
        activeStatus: { type: String, default: "A" },
        userType: { type: String, default: "N" },
        createdDate: { type: Date, default: Date.now }
        // ,
        // modified_By: { type: String , default: ""},
    })

);

