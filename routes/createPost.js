// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");

// router.get("/allposts", requireLogin, async (req, res) => {
//   try {
//     const posts = await POST.find()
//       .populate("postedBy", "_id firstname lastname")
//       .select("_id body photo address category postedBy");

//     res.json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.get("/allposts", requireLogin, async (req, res) => {
  try {
    const posts = await POST.find()
      .populate("postedBy", "_id firstname lastname")
      .select("_id body photos address category postedBy startDate endDate amount");

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// router.post("/createPost", requireLogin, async (req, res) => {
//   const { body, pic, category, address } = req.body;

//   try {
//     if (!body || !pic || !category || !address) {
//       return res.status(422).json({ error: "Please enter all fields" });
//     }

//     const post = new POST({
//       body,
//       photo: pic,
//       category,
//       address,
//       postedBy: req.user,
//     });

//     const result = await post.save();
//     res.json({ post: result });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Import necessary modules and models

router.post("/createPost", requireLogin, async (req, res) => {
  const { body, pics, category, address, startDate, endDate } = req.body;

  try {
    if (!body || !pics || !category || !address || !startDate || !endDate) {
      return res.status(422).json({ error: "Please enter all fields" });
    }

    // Calculate amount based on the date range
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const diffInDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    const ratePerDay = 10; // Replace with your own rate per day
    const amount = diffInDays * ratePerDay;

    const post = new POST({
      body,
      photos: pics,
      category,
      address,
      startDate,
      endDate,
      amount, // Add the calculated amount to the post object
      postedBy: req.user,
    });

    const result = await post.save();
    res.json({ post: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
