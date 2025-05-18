import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const reactionModel = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.reaction.findMany({
                    orderBy: {
                        id: "desc"
                    }
                })        
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    getOne: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.reaction.findUnique({
                    where: {
                        id
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    getTwoExist: async (user_id: number, page_id: number) => {

        let check = await prisma.reaction.findFirst({
            where: {
                id_user: user_id,
                id_page: page_id
            }
        })
        if(check){
            return true
        }
        return false
    },
    create: (
        id_user: number,
		id_page: number,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.reaction.create({
                    data: {
                        id_user,
						id_page,
						
                        // file
                        
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    update: (
        id: number,
        id_user: number,
		id_page: number,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.reaction.update({
                    where: {
                        id
                    },
                    data: {
                        id_user,
						id_page,
						
                        // file
                        
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    delete: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.reaction.delete({
                    where: {
                        id
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
}

export default reactionModel;