const router = require("express").Router();
const  mongoose = require("mongoose");

const Post = mongoose.model("Post");
const Comment = mongoose.model("Comments");

router.get("/name", function(req, res){
    
    res.send({

        name: "Inzamam"
    })
});

router.get("/", async function(req, res){

        const posts = await Post.find({});
        res.send(posts);

});

router.post("/", async function(req, res){
   
       const post = new Post();
       post.title = req.body.title;
       post.content = req.body.content;
       await post.save();
       res.send(post);

});

router.get("/:postId", async function(req, res){

        const post = await Post.findOne({_id: req.params.postId});
        res.send(post);

});

router.put("/:postId", async function(req, res){

        const post = await Post.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body,{
            new: true,
            runValidators: true
        });
        
        res.send(post);

});

router.delete("/:postId", async function(req, res){

        const post = await Post.findByIdAndRemove({
            _id: req.params.postId
        });

        res.send(post);
    
});

// Comments

// Create a Comment
router.post("/:postId/comment", async function(req, res){

    //Find a Post
    const post = await Post.findOne({_id: req.params.postId});

    //Create a comment
    const comment = new Comment();
    comment.content = req.body.content;
    comment.post = post._id;
    await comment.save();

    //Associate Post with comment
    post.comments.push(comment._id);
    await post.save(); 
    res.send(comment);
});

//Read a Comment
router.get("/:postId/comment", async function(req, res){

    const post = await Post.findOne({_id: req.params.postId}).populate(
        "comments"
        );
    res.send(post);    

});

//Edit a comment
router.put("/comment/:commentId", async function(req, res){

    const comment = await Comment.findOneAndUpdate({
        _id: req.params.commentId
    }, 
    req.body,
    {new: true, runValidators: true}
    );
    res.send(comment);
});

//Delete a comment
router.delete("/comment/:commentId", async function(req, res){
    const comment = await Comment.findOneAndRemove(req.params.commentId);
        res.send({message: "Comment is Deleted"});
});


module.exports = router;