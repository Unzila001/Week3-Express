import promisePool from '../../utils/database.js';

const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3602,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password123',
  },
];

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users',
  );
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id],
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users
  (name, username, email, password, role)
  VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return { user_id: result.insertId };
};

const updateUser = async (id, user) => {
  const { name, username, email, role } = user;
  const sql = `UPDATE wsk_users
  SET name = ?, username = ?, email = ?, role = ?
  WHERE user_id = ?`;

  const params = [name, username, email, role, id];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
};

export { listAllUsers, findUserById, addUser, updateUser };
