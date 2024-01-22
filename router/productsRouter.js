import express from 'express';

const productRouter = express.Router();

// get all products
productRouter.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });
  
  // Create Product 
  productRouter.post('/', (req, res) => {
      res.status(201).send({...req.body, id:'1'});
  });
  
  // Update Product
  productRouter.put('/:id', (req, res) => {
      res.status(200).send({...req.body, id: req.params.id});
  });
  
    // Delete Product  
    productRouter.delete('/:id', (req, res) => {
        res.status(200).send('Product deleted', req.params.id);
    });

export default productRouter;