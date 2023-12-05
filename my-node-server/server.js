// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { registerUser } = require('./UserDB/RegisterUser');
const { loginUser } = require('./UserDB/LoginUser')
const { ratingsManager } = require('./Ratings/Ratings')
const { checking } = require('./Ratings/Check')

const app = express();
const PORT = 5002; // or any port you prefer

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://akshaygaur2407:CKXFfXu82CMplE0f@cluster0.xsd57v8.mongodb.net/Assignment_moengage?retryWrites=true&w=majority";
mongoose.connect(uri);

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {  
      return res.status(400).json({ error: 'Password is required.' });
    }

    const result = await registerUser(email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    console.log(result.message);
    res.status(201).json({ message: result.message });
  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {  
      return res.status(400).json({ error: 'Password is required.' });
    }

    const result = await loginUser(email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    console.log(result.message);
    res.status(201).json({ message: result.message });

  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/check/:id', async (req, res) => {
  try {
    const { id} = req.params;
    const result = await checking(id);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    
    res.status(201).json({ ratings: result.ratings, reviews: result.reviews});

  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/ratings', async (req, res) => {
  try {
    const { id , ratings, reviews } = req.body;
    const result = await ratingsManager(id,  ratings, reviews );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    console.log(result.message);
    res.status(201).json({ message: result.message });

  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
