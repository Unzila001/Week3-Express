import promisePool from '../../utils/database.js';

const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id],
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const sql = `INSERT INTO wsk_cats
    (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)`;

  const params = [cat_name, weight, owner, filename ?? `no image`, birthdate];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return { cat_id: result.insertId };
};

const modifyCat = async (cat, id) => {
  const sql = `UPDATE wsk_cats
    SET cat_name = ?, weight = ?, owner = ?,
        filename = ?, birthdate = ?
    WHERE cat_id = ?`;

  const params = [
    cat.cat_name,
    cat.weight,
    cat.owner,
    cat.filename,
    cat.birthdate,
    id,
  ];

  const [result] = await promisePool.execute(sql, params);
  console.log('UPDATE RESULT:', result);

  if (result.affectedRows === 0) {
    return false;
  }

  return { message: 'success' };
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id],
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: 'success' };
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };
