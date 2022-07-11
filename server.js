const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chaudhrywasiullah807@gmail.com",
      pass: "password01!",
    },
  });

  //   const transporter = nodemailer.createTransport({
  //     service: "smtp.123-reg.co.uk",
  //     port: 587,
  //     secure: true,
  //     auth: {
  //       user: "info@conorbailey.com",
  //       pass: "testpassword01!",
  //     },
  //   });

  const mailOptions = {
    from: req.body.email,
    to: "chaudhrywasiullah807@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
