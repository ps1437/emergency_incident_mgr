var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  tls: { rejectUnauthorized: false },
  auth: {
    user: "useremail",
    pass: "pwd"
  }
});

module.exports.sendMail = (mailId, userName, msg, subject) => {
 
  console.log(mailId + " : " + userName + " :" + msg + ": " + subject + ":");

  var mailOptions = {
    from: "useremail",
    to: mailId,
    subject: subject,
    text: "Hi " + userName + ",\n\n" + msg + "\n\n\nThanks ,\nEISM ADMIN\n Emergenecy Incident Services\nINDIA"
  };

   transporter.sendMail(
    mailOptions,
    function(error, info) {
      if (error) {
        return console.log(error);
      
      } else {
        console.log("Email sent: " + info.response);
       
        response = info.response;
       
        return response;
      }
    }
  );
};
