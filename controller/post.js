const postRouter = require('express').Router();
// const {response} = require('express');
const Post = require('../models/post')

postRouter.get('/', (request,response,next) => {
    Post.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})

postRouter.get('/author', (request, response, next) =>{
    const author = request.params.author
    Post.find({author: author}).then((res) => {
        response.status(200).send(res)
        next()
    })
})

postRouter.post('/', async (request, response,next) =>{
    const {title, author, content} = request.body;


    if (title &&  author && content){
        const postCount = await Post.countDocuments();

        const newPost = new Post ({
            id:postCount + 1,
            title: title,
            author: author,
            content: content,
            date: Date(),
            upvotes: 0,
            downvotes: 0,
        })

        newPost.save()
        .then (res =>{
            response.status(201).send(res);
        })
        .catch(err =>{
            console.log(err)
            response.sendStatus(501);
        })

    }

    else {
        response.status(400).send({ message:"check your request body"})
    }
});

module.exports = postRouter