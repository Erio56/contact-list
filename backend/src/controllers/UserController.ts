import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export class UserController {

   async createUser( request: Request, response: Response ){
      try {
         const { username, password } = request.body;

         const duplicateUser = await User.findOne({ where: {username: username} })

         if(duplicateUser){
            response.status(400).json({ error: "User already exists"});
            return;
         }

         if(username && password){
            const newUser = await User.create({ username: username, password: hashSync( password, genSaltSync(1) ) });
            response.json({ token: sign({ userId: newUser.getDataValue('id') }, 'CHANGE ME') })
         } else {
            response.json({error: 'papi, la cagó'});
         }
      } catch (error) {
         console.log(error);
         response.status(500).send();
      }
   };

   async loginUser( request: Request, response: Response){
      try {
         const { username, password } = request.body;
         console.log(username, password);
         if(username && password){
            const user = await User.findOne({ where: {username: username} })

            if( user && compareSync(password, user.getDataValue('password')) ){
               response.json({ token: sign({ userId: user.id }, 'CHANGE ME') });
            }else{
               console.log(user);
            }

         } else {
            response.json({error: 'papi, la cagó'});
         }
      } catch (error) {
         console.log(error);
         
         response.status(500).send();
      }
   };
}
