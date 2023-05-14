import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { authenticateJwt } from '../middleware/authentication-JWT';
import {createProduct, deleteProduct, getProduct, getProducts}  from '../controllers/products'

const router = express.Router();
router.use(bodyParser.json())
router.use(express.urlencoded({extended:true}));

router.use(express.static('public'));

// Product API CRUD router

export default(router:express.Router) =>{
  router.post('/products', createProduct)
  router.get('/products:id', getProduct)
  router.get('/products', getProducts)
  router.delete('/products', deleteProduct)
}
