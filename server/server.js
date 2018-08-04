const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const querystring = require('querystring');
const request = require('request');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

const app = express();

app.use(cors());

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: process.env.REDIRECT_URI
    }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const uri = process.env.FRONTEND_URI;
    res.redirect(uri + '?access_token=' + access_token);
  });
});

console.log('Listening on port 3000');
app.listen(3000);