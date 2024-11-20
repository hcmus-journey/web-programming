import express from 'express';
import mainRoutes from './routes/MainRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import PassportConfig from './config/PassportConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const expressSession = session;
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));


new PassportConfig(app);

app.set('view engine', 'ejs');

app.set('views', './views'); 

app.use('/', mainRoutes);

app.use('/node_modules', express.static('node_modules'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/constants', express.static(path.join(__dirname, 'constants')));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});