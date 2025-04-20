const express = require('express');
const otherRouter = express.Router();

//routes
otherRouter.get('/', (req, res) => {
    res.redirect('/blogs');
});

//about
otherRouter.get('/about', (req, res) =>{
    res.render('about', { 
        title: 'About', 
        uniqueStyle: 'about', 
        currentPath: req.path
    });
});

module.exports = otherRouter;