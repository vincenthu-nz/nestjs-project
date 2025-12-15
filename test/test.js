import mysql from 'mysql2/promise';

async function test() {
  try {
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'nest_user',
      password: 'VH520Avril',
      database: 'blog',
    });
    console.log('Connected!');
  } catch (e) {
    console.error('ERROR:', e);
  }
}

test();
