const router = require('express').Router();

const MongoDAO = require('../mongo.dao');

const mongodao = new MongoDAO();

router.get('/products', async (req, res) => {
  try {
    await mongodao.connect();
    const products = await mongodao.getDocuments('products');
    mongodao.disconnect();
    res.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const product = await mongodao.getDocumentById('products', req.params.id);
    mongodao.disconnect();
    res.status(200).send({ product });
  } catch (error) {
    console.log(error);
  }
});

router.post('/products', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.createDocument('products', req.body);
    mongodao.disconnect();
    res.status(201).send({ response });
  } catch (error) {
    console.log(error);
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.replaceDocument('products', req.params.id, req.body);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
  }
});

router.patch('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.updateDocument('products', req.params.id, req.body);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.deleteDocument('products', req.params.id);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
