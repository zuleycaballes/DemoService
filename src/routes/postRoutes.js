import express from 'express';
import {
    createPost,
    getAllPosts,
    deletePost,
    updatePost
} from '../controllers/postController.js'

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost)

export default router;