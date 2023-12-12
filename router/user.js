const ethers = require("ethers");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../database/schemas/user");
const { validateEmail, dateToUTC8, makeid } = require("../utils");
const jwtSecret = "the-secret-12345";

router.get("/test", function (req, res) {
  res.send("user router test");
});

router.post("/signup", async function (req, res) {
  try {
    const { email, password } = req.body;
    const referred_code = req.body?.referred_code;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password is required",
      });
    }
    if (!validateEmail(email)) {
      return res.json({
        success: false,
        message: "Email format error",
      });
    }

    const wallet = ethers.Wallet.createRandom();

    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      return res.json({
        success: false,
        message: "User existed",
      });
    }

    const user = new User({
      email,
      password,
      register_date: dateToUTC8(Date.now()),
      referred_code: referred_code || "", // 被推薦碼
      referral_code: makeid(8), // 個人推薦碼
      invited_list: [], // 下線 email 列表
      privateKey: wallet.privateKey, // Store the private key
      publicKey: wallet.address,    // Store the public key (address)
      mnemonic: wallet.mnemonic.phrase, // Store the mnemonic phrase
    });
    if (referred_code) {
      // 把推薦人的 invitedList 加入 email
      await User.findOneAndUpdate(
        {
          referral_code: referred_code,
        },
        {
          $push: { invitedList: email },
        }
      );
    }
    user.save(function (err) {
      if (err) console.log(err);
      res.json({
        success: true,
        message: "Signup success",
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "signup error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password is required",
      });
    }
    const _user = await User.findOne({
      email,
    });
    if (!_user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    if (_user.password === password) {
      const token = jwt.sign(
        { email: req.body?.email, loginDate: dateToUTC8(Date.now()) },
        jwtSecret
      );
      return res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
});

router.post("/verify-login", (req, res) => {
  try {
    const token = req.body?.token;
    const email = req.body?.email;
    if (!token) {
      return res.json({
        success: false,
        message: "token is required",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "email is required",
      });
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
        });
      }
      if (decoded?.email === email) {
        return res.json({
          success: true,
          data: decoded,
        });
      } else {
        return res.json({
          success: false,
          message: "email not match",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "verify error",
    });
  }
});

module.exports = router;
