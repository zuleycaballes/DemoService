import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params) => {
    return pool.query(text, params);
};

const initializeDatabase = async() => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                created_at TIMESTAMPS DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPS DEFAULT_CURRENT_TIMESTAMP
            );
            `);
            console.log('database tables created or already exist.');
    } catch (error) {
        console.error('error initializing the database', error);
    }
}

initializeDatabase();

export default pool;