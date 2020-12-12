const postRouter = require('express').Router();
// const {response} = require('express');
const Post = require('../models/post')
const ObjectID = require('mongodb').ObjectID;




//route for getting all posts
postRouter.get('/', (request,response,next) => {
    Post.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


//route for getting all posts by a specific author
postRouter.get('/author/:author',(request,response,next)=>{
    const author= request.params.author;
     Post.find({author:author}).then(res=>{
         response.status(200).send(res)
         next();
     })
 })


 
//route for updating a post content and number of votes
postRouter.patch('/:id',async(req ,res)=>{
    try{

       let _id = new ObjectID(req.params.id)         
       const post=await Post.findOne({ _id: _id}).exec();
              
       if (req.body.content&& req.body.upvotes && req.body.downvotes ) {
           post.content = req.body.content
           post.upvotes = req.body.upvotes
           post.downvotes = req.body.downvotes
       }
          post.save()
       res.send(post)
       }
     catch{
       res.status(404)
       res.send({ error: "Post doesn't exist!" })
     }
})



//route for getting post with a specific id, not working
postRouter.get('/id', (request, response, next) =>{
    const id = request.params.id
    Post.findById({id: id}).then((res) => {
        response.status(200).send(res)
        next()
    })
})



//route for deleting a post
postRouter.delete('/:id',async(req,res)=>{
    try {
        let _id = new ObjectID(req.params.id) 
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send("Succesffuly deleted")
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
 })



//route for creating a post
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