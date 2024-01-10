const express = require("express");
const router = express.Router();
const User = require("../database/models/user");

router.get("/test", function (req, res) {
  res.send("user router test");
});

// Create a new user
router.post("/signup", async (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.json({
      success: false,
      reason: "walletAddress is required",
    });
  }
  try {
    const user = await User.create({ walletAddress });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
