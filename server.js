const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// In-memory storage for URLs. In a real-world application, consider using a database.
const urlDatabase = {
    'abc123': 'http://example.com/shortened-url-1',
    'xyz321': 'http://example.com/shortened-url-2'
  };

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/:shortened', (req, res) => {
    const originalUrl = urlDatabase[req.params.shortened];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.post('/shorten', (req, res) => {
    const originalUrl = req.body.url;
    const shortened = crypto.randomBytes(4).toString('hex');  // Generate a random 8-character string
    urlDatabase[shortened] = originalUrl;
    res.send(`Shortened URL: <a href="/${shortened}">/${shortened}</a>`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
