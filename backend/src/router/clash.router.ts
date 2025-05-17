import express from "express"
import clashController from "../controller/clash.controller";
const clashRouter = express.Router()

clashRouter.get('/', clashController.getAll)
clashRouter.get('/:id', clashController.getOne)
clashRouter.post('/', clashController.create)
clashRouter.post('/addFile', clashController.addFile)
clashRouter.put('/', clashController.update)
clashRouter.delete('/', clashController.delete)

export default clashRouter;