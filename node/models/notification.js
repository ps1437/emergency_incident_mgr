var mongoose = require('mongoose');

module.exports = mongoose.model('ESIM_NOTIFICATIONS',

    new mongoose.Schema({

        subject: { type: String, required: true ,lowercase:true ,trim:true },
        description: { type: String, required: true },
        createdBy: { type: String, required: true },
        createdDate: { type: Date, default: Date.now }
    })

);

