import { Response, Request } from "express";
import clashModel from "../model/clash.model";
import pageModel from "../model/page.model";
import fs from 'fs/promises';
import path from 'path';
const clashController = {
    getAll: async (req: Request, res: Response) => {
        try {
            let result = await clashModel.getAll();
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getByUser: async (req: Request, res: Response) => {
        try {
            let {id} = req.params
            console.log(id);
            
            let result = await clashModel.getByUser(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    addInteraction: async (req: Request, res: Response) => {
        try {
            let {id, type} = req.body
            console.log("id");
            
            let result = await clashModel.incrementLike(parseInt(id), type);
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            let { id } = req.params
            let result = await clashModel.getOne(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let {
            title,
            id_user1,
            id_user2,
        } = req.body
        // file
        console.log(title);
        
        try {

            let id_page1 = await pageModel.create("", "clash", parseInt(id_user1))
            let id_page2 = await pageModel.create("", "clash", parseInt(id_user2))
            await clashModel.create(
                title,
                id_page1.id,
                id_page2.id,
                parseInt(id_user1),
                parseInt(id_user2),
                0,
                // file
            )
            res.status(200).send({
                id: id_page1
            })
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    addFile: async (req: Request, res: Response) => {
        try {
            const { id, content, id_user } = req.body;
            const id_page = await clashModel.getFileByUser(parseInt(id), parseInt(id_user))
            const fileName = `page-${Date.now()}.html`;
            const filePath = path.join(__dirname, '../../public', fileName);
            const url = `/${fileName}`; // URL accessible publiquement

            // Écrire le fichier dans le dossier public
            await fs.writeFile(filePath, content, 'utf8');
            console.log(id_page);
            
            let result = await clashModel.updateFile(id_page, url)
            res.status(200).send(result)
        } catch (err: any) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    update: async (req: Request, res: Response) => {
        let {
            title,
            id_page1,
            id_page2,
            id_user1,
            id_user2,
            nbr_like,
        } = req.body
        let id = parseInt(req.body.id)
        try {
            let result = await clashModel.update(
                id,
                title,
                id_page1,
                id_page2,
                id_user1,
                id_user2,
                nbr_like,
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
            let result = await clashModel.delete(
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

export default clashController;