import express from 'express';
import authentication from './authentication';
import users from './users';
import products from './products'


const router = express.Router();

// Router

export default () => {
    authentication(router);
    users(router);
    products(router);
    return router;
}