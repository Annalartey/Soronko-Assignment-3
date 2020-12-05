const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },
 
    content: {
        type: String,
    },

    date: {
        type: Date,
        required: true,
    },

    upvotes: {
        type: Number,
        required: false,
    },

    downvotes: {
        type: Number,
        required: false,

    }
})


module.exports = mongoose.model("Post", postSchema);