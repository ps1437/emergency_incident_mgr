var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EASM',{ useNewUrlParser: true });
//mongoose.connect('mongodb://pr323088:pr323088@ds135364.mlab.com:35364/easm',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;