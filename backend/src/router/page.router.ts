import express from "express"
import pageController from "../controller/page.controller";
const pageRouter = express.Router()

pageRouter.get('/', pageController.getAll)
pageRouter.get('/:id', pageController.getOne)
pageRouter.post('/', pageController.create)
pageRouter.put('/', pageController.update)
pageRouter.delete('/', pageController.delete)

export default pageRouter;