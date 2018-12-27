var mongoose = require("mongoose");


const incidentScheme = mongoose.Schema({
  incident_no: { type: String, required: true },
  incident_type: { type: String, required: true ,lowercase:true },
  incident_desc: { type: String  },
  incident_created_date: { type: Date, default: Date.now },
  incident_raised_by: { type: String ,lowercase:true},
  incident_location: { type: String, required: true },
  contact_no: { type: Number, required: true },
  incident_status: { type: String },
  incident_owner: { type: String },
  incident_modified_date: { type: Date ,default: Date.now }
});

module.exports = mongoose.model("ESIM_INCIDENT", incidentScheme);
