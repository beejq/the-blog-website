const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const otherRoutes = require('./routes/otherRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://bitorres:bitorres123@blog.lf3topv.mongodb.net/blog-database?retryWrites=true&w=majority&appName=Blog';
mongoose.connect(dbURI)
    .then( (result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static('assets/uploads'));

//other routes
app.use(otherRoutes);

//blog routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404', 
        uniqueStyle: 'error', 
        currentPath: req.path
    });
});