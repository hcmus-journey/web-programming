const express = require('express');
const mainRoutes = require('./routes/MainRouter');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use('/', mainRoutes);

app.use('/node_modules', express.static('node_modules'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/constants', express.static(path.join(__dirname, 'constants')));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});