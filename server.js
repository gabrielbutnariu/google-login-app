const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID)

const app = express();
app.use(express.json());


app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    // upsert(users, { name, email, picture });
    res.status(201);
    res.json({ name, email, picture });
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log(
      `Server is ready at http://localhost:${process.env.PORT || 5000}`
    );
  });