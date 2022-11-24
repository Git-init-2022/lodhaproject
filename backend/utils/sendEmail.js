const nodeMailer = require("nodemailer");


const sendEmail = async (options) => {
  console.log("Entered");
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    tls: true,
    auth: {
    user: 'rsaikrish02@gmail.com',
    pass: 'zjuqbhyxvkwxmvlp'
  }
    
  });
  console.log(options);
  const mailOptions = {
    from: "rsaikrish02@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;