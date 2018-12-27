export class IncidentModel {
  incident_no: Number;
  incident_type: string;
  incident_desc: string;
  incident_created_date: Date;
  incident_raised_by: string;
  incident_location: string;
  contact_no: Number;
  incident_status: string;
  incident_owner: string;
  incident_modified_date: Date;

  constructor(
    incident_no,
    incident_type,
    incident_desc,
    incident_status,
    incident_location,
    contact_no,
    incident_raised_by,
    incident_created_date,
    incident_owner,
    incident_modified_date
  ) {
    this.incident_no = incident_no;
    this.incident_desc = incident_desc;
    this.incident_type = incident_type;
    this.incident_status = incident_status;
    this.incident_location = incident_location;
    this.contact_no = contact_no;
    this.incident_raised_by = incident_raised_by;
    this.incident_created_date = incident_created_date;
    this.incident_owner = incident_owner;
    this.incident_modified_date = incident_modified_date;
  }
}
