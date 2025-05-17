import { Response, Request } from "express";
import userModel from "../model/user.model";
import { generateToken, uploadFile } from "../services/services";
import bcrypt from "bcrypt"
const userController = {
    getAll: async (req: Request, res: Response) => {
        try {
            let result = await userModel.getAll();
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            let { id } = req.params
            let result = await userModel.getOne(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let { 
            name,
				email,
				password,
				
        } = req.body
        
        // file
        let file_for_profile : any = null;
		
        try {
            
            if (
                req.files 
                && req.files.profile
				
            ) {
            
            	file_for_profile = await uploadFile(
                	"./public/",
                	req.files.profile,
                	req.body.name.replace(" ", "_")
            	)
            
            } else {
                file_for_profile = " "
                // res.status(400).send("There is empty file you given")
            }
            let find = await userModel.getByEmail(email)
            if(find) {
                res.status(403).send("Cette adresse email est déjà associée à un compte")
            }else {
                let saltRounds = 10
                bcrypt.hash(password, saltRounds, async function(err: any, hash: any) {
                    if(err){
                        res.status(403).send("Registration failed")
                    }else{
                        let result = await userModel.create(
                            name,
                            email,
                            hash,
                            // file
                            file_for_profile,
                            
                        )
                        res.status(200).send(result)
                    }
                })
                
            }
                   
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            name,
				email,
				password,
				
        } = req.body
        let id = parseInt(req.body.id)
        let file_for_profile : any = null;
		
        try {
            
            if (
                req.files 
                && req.files.profile
				
            ) {
            
            	file_for_profile = await uploadFile(
                	"./public/",
                	req.files.profile,
                	req.body.profile.replace(" ", "_")
            	);
            
            } else {
                res.status(400).send("There is empty file you given")
            }
             
            let result = await userModel.update(
                id,
                name,
				email,
				password,
				
                // file
                file_for_profile,
				
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
            let result = await userModel.delete(
                id
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getByEmail: async(req: Request, res: Response) => {
        let email = req.params.email
        try {
            let result = await userModel.getByEmail(
                email
            )
            res.status(200).send(result)      
        }catch(error: any){
            console.log(error)
            res.status(500).send(error)
        }
    },
    login: async(req: Request, res: Response) => {
        let {email, password} = req.body;
        console.log(email);
        
        let user = await userModel.getByEmail(email)
        if(user){
            let psw = String(user.password)
            bcrypt.compare(password, psw, function(err: any, verified: any){
                if (err) return res.status(403).send("Mot de passe incorrect");
                if (verified) {
                    const token = generateToken(user?.id , user?.email);
                    res.status(200).send(user);
                }
                else {
                    res.status(403).send("Mot de passe incorrect")
                }
            })
        }else{
            res.status(404).send("Utilisateur non existant")
        }
    }
}

export default userController;