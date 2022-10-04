const express = require('express');
const router = express.Router();
const { mint, getUserLastestMintedTokenId } = require("../web3/index")

router.get('/test', function (req, res) {
  res.send('user router test');
});

router.post('/register', function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.end('No username or password');
  }
  const user = new User({ username, password, register_data: Date.now() });
  user.save(function (err) {
    if (err) console.log(err);
    res.end('save');
  });
});

router.post('/verify', (req, res) => {
  jsonwebtoken.verify(req.body.token, 'YourSecretKey', (err, decoded) => {
    if (err) {
      res.json({
        status: error
      });
    };
    if (decoded.username) {
      res.json({
        status: 'ok',
        data: decoded
      });
    }
  })
})

router.post('/mint', async (req, res) => {
  try {
    const { userId, level, type } = req.body;
    // TODO: get privateKey from userId DB
    const privateKey = process.env?.privateKey;

    const userAddress = process.env?.userAddress;
    const result = await mint(privateKey, level, type);
    const lastestMintedTokenId = await getUserLastestMintedTokenId(privateKey, userAddress);

    res.json({
      success: true,
      message: result,
      tokenId: lastestMintedTokenId
    });
  } catch(err) {
    console.log(err)
    res.json({
      success: false,
      message: err
    })
  }
})

module.exports = router;