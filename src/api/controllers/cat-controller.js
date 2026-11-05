import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log(`Form data:`, req.body);
  console.log(`Upload file:`, req.file);

  const result = await addCat({
    ...req.body,
    filename: req.file?.filename,
  });

  if (result.cat_id) {
    res.status(201);
    res.json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  console.log('PUT RECEIVED:', req.params.id, req.body);

  const result = await modifyCat(req.body, req.params.id);

  if (result) {
    res.json({ message: 'Cat item updated.' });
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);

  if (result) {
    res.json({ message: 'Cat item deleted.' });
  } else {
    res.sendStatus(404);
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
