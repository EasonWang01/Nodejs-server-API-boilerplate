const express = require('express');
const router = express.Router();

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

module.exports = router;