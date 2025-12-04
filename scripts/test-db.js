const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
        });
        console.log('Connected with empty password!');
        await connection.end();
    } catch (error) {
        console.log('Failed with empty password:', error.message);
    }
}

testConnection();
