const mysql = require('mysql2/promise');

const createConnection = async () => {
  return await mysql.createConnection({
    host: 'sql103.epizy.com',
    user: 'epiz_28297606',
    password: '6zndkIIZ4eBC9X0',
    database: 'wa_session'
  });
}

const readSession = async () => {
  try {
    const connection = await createConnection();
    const res = await connection.execute('SELECT * FROM wa_api ORDER BY created_at DESC LIMIT 1');
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  connection.execute('INSERT INTO wa_api (session) VALUES($1)', [session], (err, results) => {
    if (err) {
      console.error('Failed to save session!', err);
    } else {
      console.log('Session saved!');
    }
  });
}

const removeSession = () => {
  connection.execute('DELETE FROM wa_api', (err, results) => {
    if (err) {
      console.error('Failed to remove session!', err);
    } else {
      console.log('Session deleted!');
    }
  });
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}
