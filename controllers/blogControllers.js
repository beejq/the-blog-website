//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');
const fs = require('fs');
const path = require('path');

const blog_index = async ( req, res) => {
    try{
        const blogs = await Blog.find().sort( {createdAt: -1} );
        res.render('blogs/index', {
            title: 'All Blogs',
            uniqueStyle: 'home',
            currentPath: req.path,
            blogs
        });
    } 
    catch(err){
        console.log(err);
    }
};

const blog_createForm = (req, res) => {
    res.render('blogs/create', { 
        title: 'Create New Blog', 
        uniqueStyle: 'create', 
        currentPath: req.path
    });
};

const blog_create_post = async (req, res) => {
    const { title, snippet, body } = req.body;
    const image = req.file ? req.file.filename : null;
  
    const blog = new Blog({ title, snippet, body, image: req.file.filename });
  
    try {
      await blog.save();
      res.redirect('/blogs');
    } catch (err) {
      console.log(err);
    }
};

const blog_details = async (req, res) => {
    const id = req.params.id;
    try{
        const blog = await Blog.findById(id);
        res.render('blogs/details', { 
            blog, 
            title: 'Blog Details',
            uniqueStyle: 'details',
            currentPath: req.path
        });
    }
    catch(err){
        console.log(err);
        res.status(404).render('404', { 
            title: 'Not found',
            uniqueStyle: 'error',
            currentPath: req.path            
         });
    }
};

const blog_delete = async (req, res) => {
        const id = req.params.id;
        try{
            const blog = await Blog.findById(id)
            
            if (blog) {
                const imagePath = path.join( __dirname ,'..', 'assets', 'uploads', blog.image);
                
                fs.unlink(imagePath, (err) => {
                   if(err){
                        console.log(err);
                   } 
                });
    
                await Blog.findByIdAndDelete(id);
        
                res.json({ redirect: '/blogs' });
            }
            else{
                res.status(404).json({ error: 'No Blog'});
            }
        }
        catch(err){
            console.log(err);
        }
};

module.exports = {
    blog_index,
    blog_createForm,
    blog_create_post,
    blog_details,
    blog_delete
};