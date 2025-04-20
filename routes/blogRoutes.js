const express = require('express');
const multer = require('multer');
const path = require('path');

const blogController = require('../controllers/blogControllers');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//home page all blogs shown
router.get('/', blogController.blog_index);

// create a blog
router.get('/create', blogController.blog_createForm);

//create blog with image upload
router.post('/', upload.single('image'), blogController.blog_create_post);

//find specific blog
router.get('/:id', blogController.blog_details);

// delete a blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;