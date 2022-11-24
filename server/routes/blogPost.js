const { Router } = require("express");
const {body, param, validationResult} = require('express-validator');
const BlogPost = require('../models/index.js');

const blogPostRouter = Router();

/**
 * Status Codes: 
 *  200 - success
 *  400 - validation error
 *  500 - Server error (DB not working)
 *  Not found/nothing to delete - 404
 */

// GET - Get all blogPosts - returns array of posts
blogPostRouter.get('/', async (req,res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.json(blogPosts);
    } catch (error) {
        res.sendStatus(500).send(error);//server error
    }
})

// GET - Get one single post - returns one single post
blogPostRouter.get('/:blogPostId', async (req,res) => {
    try {
        const blogPosts = await BlogPost.findOne({where: {id: req.params.blogPostId}});;
        if(blogPosts) res.json(blogPosts);
        else res.sendStatus(404);
    } catch (error) {
        res.sendStatus(500).send(error);//server error
    }
})

// PUT -  Update a single post - return updated post
blogPostRouter.put('/:blogPostId', async (req, res) => {
    try {
        const blogPost = await BlogPost.findOne({where: {id: req.params.blogPostId}});
        if(blogPost){
            await blogPost.update({author : req.body.author, title: req.body.title, content: req.body.content, category: req.body.category})
            res.json(blogPost); //200 - OK sent automatically
        }else{
            res.sendStatus(404); //Not found
        }        
    } catch (error) {
        res.status(500).send(error); //Internal server error
    }
})

// POST - Create a single post - return created post
blogPostRouter.post('/', async (req, res) => {
    try {
        const newPost = await BlogPost.create({author : req.body.author, title: req.body.title, content: req.body.content, category: req.body.category});
        res.json(newPost); //200 - OK sent automatically
    } catch (error) {
        res.status(500).send(error); //Internal server error
    }
})


// DELETE - Delete a single post - return number of posts deleted (1 or  hopefully)
blogPostRouter.delete('/:blogPostId', async (req, res) => {
    try {
        const deletedPost = await BlogPost.destroy({where: {id: req.params.blogPostId}});
        if(deletedPost) res.json(deletedPost); //200 - OK sent automatically
        else res.status(404).json(deletedPost); //Return 0, and status 404 - not found
    } catch (error) {
        res.status(500).send(error); //Internal server error
    }
})

module.exports = blogPostRouter;