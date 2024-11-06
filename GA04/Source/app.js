const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/', routes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static('node_modules'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});