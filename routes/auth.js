const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {Jwt_secret} = require("../keys");
const nodemailer = require('nodemailer');
const requireLogin = require("../middlewares/requireLogin");

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin';

// signup api 
router.post("/signup", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if(!firstname || !lastname || !email || !password) {
        return res.status(422).json({ error: "Please enter all the fields" });
    }
    USER.findOne({ $or: [{ firstname: firstname }, { email: email }] }).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "user already exists with that name or email"})
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                firstname,
                lastname,
                email,
                password: hashedPassword
            })
            user.save()
            .then(user => { res.json({ message: "Registered successfully" }) })
            .catch(err => { console.log(err) })
        })
    })
           
})

// signin api


router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
    }

    // Check if the user is an admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminToken = jwt.sign({ email }, Jwt_secret);
        return res.json({ adminToken });
    }

    // Continue with the existing user login logic
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" });
        }

        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                const token = jwt.sign({ _id: savedUser.id, firstname: savedUser.firstname }, Jwt_secret);
                return res.json({ token });
            } else {
                return res.status(422).json({ error: "Invalid password" });
            }
        }).catch(err => res.status(500).json({ error: "Internal Server Error" }));
    });
});


// forgot-password api
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await USER.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ Status: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, "Jwt_secret", { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amisha.nanda2000@gmail.com', // Your Gmail email
                pass: 'dxfr esdh rfme qvyx' // Your Gmail App Password (or regular password if not using two-factor authentication)
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'amisha.nanda2000@gmail.com',
            to: user.email,
            subject: 'Reset Password Link',
            text: `Click on the link to reset your password: http://localhost:3000/reset_password/${user._id}/${token}`,
            html: `<p>Click on the link to reset your password: <a href="http://localhost:3000/reset_password/${user._id}/${token}">Reset Password</a></p>`
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        return res.send({ Status: "Success" });
    }   catch (error) {
        console.error(error);
        return res.status(500).send({ Status: "Internal Server Error" });
    }
});

// reset password api
router.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "Jwt_secret", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                USER.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})

router.get("/profile", requireLogin, async (req, res) => {
    try {
      const userProfile = await USER.findById(req.user._id).select("_id firstname lastname email"); // Add any other user details you want to include
  
      res.json(userProfile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put("/updateProfile", requireLogin, async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      // Update the user details in the database
      const updatedUser = await USER.findByIdAndUpdate(
        req.user._id,
        { firstname, lastname, email, password },
        { new: true } // To get the updated user details in the response
      ).select("_id firstname lastname email"); // Add any other user details you want to include
  
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  //Admin get
  router.get("/user", (req, res) => {
    const { firstname, lastname, email } = req.query;
  
    // Create a query object based on the provided parameters
    const query = {};
    if (firstname) {
      query.firstname = firstname;
    }
    if (lastname) {
      query.lastname = lastname;
    }
    if (email) {
      query.email = email;
    }
  
    // Find the user(s) based on the query
    USER.find(query)
      .then((users) => {
        if (users.length === 0) {
          return res.status(404).json({ message: "No users found with the provided criteria" });
        }
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

module.exports = router;

