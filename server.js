const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require(path.join(__dirname, 'routes'));
const router = express.Router();
const port = 3001;

routes(router);

app.use('/api', router);
router.use((response, req, res, next) => {
    res.status(200).send({ auth: true, response: response, message: 'Success' });
});

app.listen(port);
