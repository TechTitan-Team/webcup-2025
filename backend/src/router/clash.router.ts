import express from "express"
import clashController from "../controller/clash.controller";
const clashRouter = express.Router()

clashRouter.get('/', clashController.getAll)
clashRouter.get('/getOne/:id', clashController.getOne)
clashRouter.get('/byUser/:id', clashController.getByUser)
clashRouter.post('/create', clashController.create)
clashRouter.post('/addFile', clashController.addFile)
clashRouter.put('/', clashController.update)
clashRouter.delete('/', clashController.delete)

export default clashRouter;