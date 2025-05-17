import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const clashModel = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.clash.findMany({
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
                let result = await prisma.clash.findUnique({
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
    create: (
        title: string,
		id_page1: number,
		id_page2: number,
		id_user1: number,
		id_user2: number,
		nbr_like: number,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.clash.create({
                    data: {
                        title,
						id_page1,
						id_page2,
						id_user1,
						id_user2,
						nbr_like,
						
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
        title: string,
		id_page1: number,
		id_page2: number,
		id_user1: number,
		id_user2: number,
		nbr_like: number,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.clash.update({
                    where: {
                        id
                    },
                    data: {
                        title,
						id_page1,
						id_page2,
						id_user1,
						id_user2,
						nbr_like,
						
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
                let result = await prisma.clash.delete({
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
    updateFile: async(id: number, url: string) => {
        let result = await prisma.page.update({
            where:{
                id
            },data: {
                url: url
            }
        })
        return result;
    }
}

export default clashModel;