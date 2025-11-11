import express from 'express';
import {
    createPost,
    getAllPosts,
    deletePost
} from '../controllers/postController.js'

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);

export default router;