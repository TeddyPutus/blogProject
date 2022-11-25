const { Router } = require("express");
const {body, checkBody, param, validationResult} = require('express-validator');
const BlogPost = require('../models/index.js');
// const isBodyEmpty = require('../middleware/isBodyEmpty')
// const areFieldsEmpty = require('../middleware/areFieldsEmpty')

const { Op } = require('sequelize');

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
        res.status(500).send(error);//server error
    }
})

// GET - Get one single post - returns one single post
blogPostRouter.get('/:blogPostId', async (req,res) => {
    try {
        const blogPosts = await BlogPost.findOne({where: {id: req.params.blogPostId}});;
        if(blogPosts) res.json(blogPosts);
        else res.sendStatus(404);
    } catch (error) {
        res.status(500).send(error);//server error
    }
})

// PUT -  Update a single post - return updated post
blogPostRouter.put(
    '/:blogPostId', 

    //validates whether route parameter is numeric
    param('blogPostId').isNumeric().withMessage('Id is not Numeric'),
    
    async (req, res) => {
    //Handling errors if validation didnt pass
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }

    const blogPost = await BlogPost.findOne({where: {id: req.params.blogPostId}});
    
    // if blogPost exists in db
    if(blogPost){
        //check if body is empty
        if(Object.keys(req.body).length === 0){
            res.status(400).send({ message: "Body is empty" })

        // if not update blogpost
        } else {
            await blogPost.update({
                author: req.body.author, 
                title: req.body.title, 
                content: req.body.content, 
                category: req.body.category
            })
            res.json(blogPost); //200 - OK sent automatically
        }
    } else {
        res.status(404).send({ message: "Post does not exist" })
        }        
})
// } catch (error) {
//     res.status(500).send(error); //Internal server error

// POST - Create a single post - return created post
blogPostRouter.post(
    '/', 
    //Middleware function to check if body is empty 
    (req,res,next) =>{
        if(Object.keys(req.body).length === 0){
            res.status(400).send({ message: "Body is empty" })
        } else {
            next()
        }
    },
    //Validator function to check if any fields in body are empty
    [
        body('author').not().isEmpty().withMessage('Author field is Empty'),
        body('title').not().isEmpty().withMessage('Title field is Empty'),
        body('category').not().isEmpty().withMessage('Category field is Empty'),
        body('content').not().isEmpty().withMessage('Content field is Empty')
    ],
    async (req, res) => {

    //Handling errors if validation didnt pass 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send(errors);
          
    //If no errors, create new post
        } else{
            const newPost = await BlogPost.create({
                author : req.body.author,
                title: req.body.title, 
                content: req.body.content, 
                category: req.body.category
            })
            res.json(newPost);
        }
    }       
)


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

//FILTERING FUNCTION - SEARCHING DATABASE 
blogPostRouter.get('/search/:query', async (req,res) => {
    try {
        let allPosts = await BlogPost.findAll({where: {[Op.or] : [
            {author: {[Op.substring] : `%${req.params.query}%`}}, //iLike could make this search case insensitive but it only works with postgres
            {content: {[Op.substring] : `%${req.params.query}%`}},
            {title: {[Op.substring] : `%${req.params.query}%`}},
            {category : {[Op.substring] : `%${req.params.query}%`}}
        ]}}
        );
        res.json(allPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = blogPostRouter;