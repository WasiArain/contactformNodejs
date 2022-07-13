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
      user: "wasinodemailtest@gmail.com",
      pass: "ukafetuuypfyzxyq",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "chaudhrywasiullah807@gmail.com",
    subject: `A new Message from ${req.body.email}: ${req.body.subject}`,
    text: `Name: ${req.body.fullName},
            Email: ${req.body.email},
            Subject: ${req.body.subject},
            Message: ${req.body.message}`,
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
