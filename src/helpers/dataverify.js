function dataVerify(req, res, next) {
  const product = req.body;
  if (!product.name
    || !product.description
    || !product.price
    || !product.manufacturer
    || !product.category) {
    res.status(400).send({ error: 'Missing data' });
  } else {
    product.price = Number((product.price).replace(',', '.'));
    next();
  }
}

module.exports = dataVerify;
