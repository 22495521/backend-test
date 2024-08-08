import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

export const pool = mysql.createPool(dbConfig);

export async function connect(): Promise<mysql.PoolConnection> {
    const connection = await pool.getConnection().catch(error => {
        console.error('資料庫連線失敗' + error.message);
        throw error;
    });
    console.log('資料庫連線成功');
    return connection;
}
