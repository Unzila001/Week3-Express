import {
  addUser,
  findUserById,
  listAllUsers,
  updateUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  console.log('Add user result:', result);

  if (result.user_id) {
    res.status(201);
    res.json({ message: 'New user added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const id = req.params.id;
  const result = await updateUser(id, req.body);

  if (result) {
    res.json({ message: 'User updated.' });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);

  if (result) {
    res.json({ message: 'User and their cats deleted successfully.' });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };
