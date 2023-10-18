import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "info.beyondwork@gmail.com",
    pass: "girlspower2023",
  },
});

router.post("/contact", (req, res) => {
  transporter.sendMail({
    from: "test@gmail.com",
    to: "info.beyondwork@gmail.com",
    subject: "test test test",
    html: "this is a test",
  });
});

// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
// NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//       <https://github.com/forwardemail/preview-email>
//
// }

// main().catch(console.error);

// contactRouter.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// router.post("/contact", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const message = req.body.message;
//   const mail = {
//     from: name,
//     to: "info.beyondwork@gmail.com",
//     subject: "Contact Form Submission",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Message: ${message}</p>`,
//   };
//   contactRouter.sendMail(mail, (error) => {
//     if (error) {
//       res.json({ status: "ERROR" });
//     } else {
//       res.json({ status: "Message Sent" });
//     }
//   });
// });

export default router;
