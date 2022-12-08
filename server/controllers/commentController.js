const router = require('express').Router();


const commentService = require('../services/commentService');
const loggedIn = require('../middlewares/loggedInMiddleware'); 
const isAdmin = require('../middlewares/isAdminMiddleware');

router.get('/', async (req, res) => {

    try {
        const page = Number(req?.query?.page) - 1 || 0;
        const productId = req?.query?.product;

        const comments = await commentService.getComments(page, productId);
        const commentsCount = await commentService.getCount(productId);

        res.status(200).send({ comments, commentsCount: commentsCount.length });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const comments = await commentService.getAllCurrentItem(id);

        res.status(200).send({ comments });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.post('/create', loggedIn(), async (req, res) => { 
    try {

        const commentData = {
            name: req.body.comment.name,
            comment: req.body.comment.comment,
            rating: req.body.comment.rating,
            productName: req.body.productName,
            productId: req.body.productId, 
            creator: req.user._id
        };


        if (!commentData.name.length > 0) {
            throw new Error('Field is required!');
        }
        if (!commentData.comment.length > 0) {
            throw new Error('Field is required!');
        }
        if (!commentData.rating > 0) {
            throw new Error('Field is required!'); 
        }     


        const comment = await commentService.create(commentData);

        await commentService.updateComments(comment);

        res.status(200).send({ comment });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.delete('/:commentId', loggedIn(), async (req, res) => {
    const commentId = req.body.commentId;

    try {
        const comment = await commentService.delete(commentId);


        res.status(200).send({ comment });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;