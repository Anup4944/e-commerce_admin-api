import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER , // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

   // Generate test SMTP service account from ethereal.email

 const send = async mailInfo => {

    try {
        let  info = await transporter.sendMail(mailInfo);
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error)
    }
}
 
export const emailProcessor = ({type, otp,
    email,}) => {
console.log("From email processor" , type, otp, email)
    let info =  transporter.sendMail({
        from: `ABC SHOP👻 <${process.env.EMAIL_USER}>  `, // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      switch (type) {
          case "OPT_REQUEST":
              info = {
                  to: email, 
                  subject: "OPT for your password rest request",
                  test: `Hi, here is the OPT for your password reset, ${otp} this token will expire in 1 day`,
                  html: 

                  `<div>
              <p>Hello there</p>
              <p>Here is OPT for password reset</p>
              <p style={background: "red" : color: "white"}> ${otp}</p>

                  </div> `
              } 
              send(info);
              
              break;
              
              case "UPDATE_PASS_SUCCESS":
              info = {}
              send(info);
              
              break;
      
          default:
              break;
      }

      

}
