const router = require('express').Router();

const MongoDAO = require('../mongo.dao');
const dataVerify = require('../helpers/dataverify');

const mongodao = new MongoDAO();

router.get('/products', async (req, res) => {
  try {
    await mongodao.connect();
    const products = await mongodao.getDocuments('products');
    mongodao.disconnect();
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const product = await mongodao.getDocumentById('products', req.params.id);
    mongodao.disconnect();
    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post('/products', dataVerify, async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.createDocument('products', req.body);
    mongodao.disconnect();
    res.status(201).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.replaceDocument('products', req.params.id, req.body);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.patch('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.updateDocument('products', req.params.id, req.body);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await mongodao.connect();
    const response = await mongodao.deleteDocument('products', req.params.id);
    mongodao.disconnect();
    res.status(200).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
