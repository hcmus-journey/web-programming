import express from 'express';
import mainRoutes from './routes/MainRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import PassportConfig from './config/PassportConfig.js';
import flash from 'connect-flash'; // Import connect-flash

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const expressSession = session;
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

// Flash setup - place this after session middleware
app.use(flash());  // Add this line to enable flash messages

// Static files
app.use('/node_modules', express.static('node_modules'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/constants', express.static(path.join(__dirname, 'constants')));

new PassportConfig(app);

app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', mainRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
