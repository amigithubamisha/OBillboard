const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");

router.post("/contact", async (req, res) => {
  let newContact; // Declare newContact outside the try block

  try {
    console.log("Received contact form submission request");
    const { name, email, phone, address, message } = req.body;

    // Create a new contact instance based on the request body
    newContact = new Contact({
      name,
      email,
      phone,
      address,
      message,
    });

    // Save the contact to the database
    await newContact.save();

    console.log("Contact form submitted successfully");
    res.status(201).json({ message: "Contact form submitted successfully", contact: newContact });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//retrive in admin
router.get("/contacts", async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    // Send the contacts as a JSON response
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/contact/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully", contact: deletedContact });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
