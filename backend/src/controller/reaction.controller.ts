import { Response, Request } from "express";
import reactionModel from "../model/reaction.model";

const reactionController = {
    getAll: async (req: Request, res: Response) => {
        try {
            let result = await reactionModel.getAll();
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            let { id } = req.params
            let result = await reactionModel.getOne(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let { 
            id_user,
			id_page,
        } = req.body
        // file
        
        try {
            
            let check = await reactionModel.getTwoExist(id_user, id_page)
            if(check){
                res.status(400).send("Vous avez déjà aimé cette page")
                return
            }
            let result = await reactionModel.create(
                id_user,
				id_page,
				
                // file
                
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            id_user,
				id_page,
				
        } = req.body
        let id = parseInt(req.body.id)
        
        try {
            
 
            let result = await reactionModel.update(
                id,
                id_user,
				id_page,
				
                // file
                
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    delete: async (req: Request, res: Response) => {
        let id = parseInt(req.body.id)
        try {
            let result = await reactionModel.delete(
                id
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
}

export default reactionController;