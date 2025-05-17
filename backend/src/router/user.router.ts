import express from "express"
import userController from "../controller/user.controller";
const userRouter = express.Router()

userRouter.get('/', userController.getAll)
userRouter.get('/byEmail/:email', userController.getByEmail)
userRouter.get('/:id', userController.getOne)
userRouter.post('/', userController.create)
userRouter.post('/login', userController.login)
userRouter.put('/', userController.update)
userRouter.delete('/', userController.delete)

export default userRouter;