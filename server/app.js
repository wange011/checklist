const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
var cors = require('cors');

let app = express();
const PORT = process.env.PORT || 5000;

//database user: test, password: testing1
mongoose.connect('mongodb://test:testing1@ds145639.mlab.com:45639/checklist', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use('/', routes);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});