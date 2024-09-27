const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'HAT'))); // Adjust this path

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HAT', 'index.html')); // Adjust this path
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${8080}`);
});
