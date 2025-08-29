// const nodemailer=require("nodemailer")
// // require("dotenv").config;

// const sendEmail=async (options)=>{
// const transporter=nodemailer.createTransport({
//     host:process.env.SMTP_HOST,
//     port:process.env.SMTP_PORT,
//     service:process.env.SMTP_SERVICE,
//     auth:{
//         user:process.env.SMTP_MAIL,
//         pass:process.env.SMTP_PASSWORD
//     },
// });
// const mailOptions={ 
//     from:process.env.SMTP_MAIL,
//     to:options.email,
//     subject:options.subject,
//     text:options.message
// }

// await transporter.sendMail(mailOptions);
// };

// module.exports=sendEmail;


const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from:process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
  };

  await transporter.sendMail(mailOptions,(error, info) => {
    if (error) {
      
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
    }
});
};

module.exports = sendEmail;