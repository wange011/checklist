const express = require('express');
const router = express.Router();
const List = require('../models/list');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    List.find({}, (err, lists) => {
        res.send(lists[0]);
    });
    
});

router.put('/:id', jsonParser, function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    List.findByIdAndUpdate( {_id: req.params.id}, req.body).then((data) => console.log("Post sent"));
});

module.exports = router;