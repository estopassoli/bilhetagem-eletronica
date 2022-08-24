require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
    postRouter
} = require('./router/post');
const {
    getRouter
} = require('./router/get');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.listen(PORT, () => {
    console.log("Server running in http://" + HOST + ":" + PORT);
});

postRouter(app);
getRouter(app);