const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema defines structure of documents
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

//model based on schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;