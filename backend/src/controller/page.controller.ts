import { Response, Request } from "express";
import pageModel from "../model/page.model";
import { uploadFile } from "../services/services";
import fs from 'fs/promises';
import path from 'path';
const pageController = {
    getAll: async (req: Request, res: Response) => {
        try {
            let result = await pageModel.getAll();
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            let { id } = req.params
            let result = await pageModel.getOne(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let { type, id_user, content } = req.body;
    
        try {
            // Générer un nom de fichier unique
            const fileName = `page-${Date.now()}.html`;
            const filePath = path.join(__dirname, '../../../public', fileName);
            console.log(filePath);
            console.log(__dirname);
            const url = `/${fileName}`; // URL accessible publiquement
    
            // Écrire le fichier dans le dossier public
            await fs.writeFile(filePath, content, 'utf8');
    
            // Enregistrer l'URL et les infos dans la BDD
            const result = await pageModel.create(url, type, id_user);
    
            // Répondre avec le résultat
            res.status(200).send(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            url,
				type,
				id_user,
				
        } = req.body
        let id = parseInt(req.body.id)
        
        try {
            
 
            let result = await pageModel.update(
                id,
                url,
				type,
				id_user,
				
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
            let result = await pageModel.delete(
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

export default pageController;