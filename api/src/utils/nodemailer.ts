import nodemailer from "nodemailer";
import { getEnvironmentVariables } from "../config/env";
const env = getEnvironmentVariables();
// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: env.NODEMAILER_HOST,
    port: parseInt(env.NODEMAILER_PORT),
    secure: env.MODE === "production", // true for 465, false for other ports
    auth: {
      user: env.NODEMAILER_USER,
      pass: env.NODEMAILER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "felix@juniorfelix.com", // sender address
    to, // list of receivers
    subject: "Reset Password", // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
