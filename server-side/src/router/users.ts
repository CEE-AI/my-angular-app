import express from 'express'
import { authenticateJwt } from '../middleware/authentication-JWT'
import { isOwner } from '../middleware/index';
import {getUserById, deleteUserById, getUsers} from '../database/users'

const router = express.Router();

export default (router: express.Router) => {
  router.delete('/users/:id', async (req, res) => {
    try{
			const {id} = req.params;

			const user = await deleteUserById(id);
			if(user){
				const deletedUser = await user.deleteOne()
				res.status(200).json(deletedUser)
				
			}else{
				res.status(404)
			}
		}catch(error){
			console.log(error)
			return res.sendStatus(400)
		}
  });

	router.get('/users', async (req, res)=>{
		try{
			const users = await getUsers();

			return res.status(200).json(users)
		}catch (error) {
		console.log(error);
		return res.sendStatus(400);
		}
		});

	router.get('/users/:id', async (req, res)=>{
		try{
			const user = await getUserById(req.params.id)
			if(!user){
				res.status(404).json({message: 'user not found'})
			}
			res.status(200).json(user)
		}catch(error){
			console.log(error)
			res.sendStatus(400)
		}
	})

	router.patch('/users/:id', async (req, res)=>{
		try{
			const { id } = req.params;
			const { username } = req.body;

			if(!username) {
				return res.sendStatus(403)
			}
			
			const user = await getUserById(id);
			if(user !== null && user !== undefined){

				user.username = username;
				await user.save();
			}
			

			return res.status(200).json(user).end()

		}catch(error){
			console.log(error)
			return res.sendStatus(500)
		}
	})

  return router;
}

