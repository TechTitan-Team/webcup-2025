import express from "express"
import reactionController from "../controller/reaction.controller";
const reactionRouter = express.Router()

reactionRouter.get('/', reactionController.getAll)
reactionRouter.get('/:id', reactionController.getOne)
reactionRouter.post('/', reactionController.create)
reactionRouter.put('/', reactionController.update)
reactionRouter.delete('/', reactionController.delete)

export default reactionRouter;