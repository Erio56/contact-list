import { Router } from "express";
import { UserController } from "../controllers/UserController.ts"

const userRouter = Router()
const userController = new UserController()

userRouter.post('/user', userController.createUser );
userRouter.post('/user/authenticate', userController.loginUser );


export default userRouter;