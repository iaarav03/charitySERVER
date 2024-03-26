const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use the Gmail service
  auth: {
    user: process.env.EMAIL, // Your Gmail email address
    pass: process.env.PASSWORD, // Your Gmail password or an App Password if using 2-factor authentication
  },
});

let Mailgenerator = new mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

const registermail = async (req, res) => {
  const { username, useremail, text, subject } = req.body;
  console.log(req.body);

  var email = {
    body: {
      name: username,
      intro: text || "Welcome",
      outro: "a",
    },
  };

  var emailbody = Mailgenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: useremail,
    subject: subject || "Signup successful",
    html: emailbody,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: "You should receive an email from us" });
    })
    .catch((error) => res.status(500).send({ error }));
};

module.exports = { registermail };
