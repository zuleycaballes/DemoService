import { query } from "../db.js";

export const createPost = async (req, res) => {
    const {content} = req.body;

    try {
        const insertPostQuery = `
            INSERT INTO posts (content)
            VALUES ($1)
            RETURNING id, content, created_at;
        `;
        const result = await query(insertPostQuery, [content]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const getPostsQuery = `
            SELECT id, content, created_at
            FROM posts
            ORDER BY created_at DESC;
        `;
        const result = await query (getPostsQuery);
        res.json(result.rows)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletePostQuery = `
            DELETE FROM posts
            WHERE id = $1
            RETURNING id, content, created_at;
        `;
        const result = await query(deletePostQuery, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatePostQuery = `
            UPDATE posts
            SET content = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING id, content, created_at, updated_at;
        `;
        const result = await query(updatePostQuery, [content, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// del router viene aca, recibimos el json y checamos el contenido de este