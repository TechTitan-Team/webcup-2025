import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const clashModel = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.clash.findMany({
                    orderBy: {
                        id: "desc"
                    },
                    where: {
                        AND: [
                            {
                                page1: {
                                    url: {
                                        not: ""
                                    }
                                }
                            },
                            {
                                page2: {
                                    url: {
                                        not: ""
                                    }
                                }
                            }
                        ]
                    }
                })        
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: " + error))
            } 
        })
    },
    getByUser: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await prisma.clash.findMany({
                    where: {
                        OR: [
                            {
                                id_user1: id,
                                page1: {
                                    url: ""
                                }
                            },
                            {
                                id_user2: id,
                                page2: {
                                    url: ""
                                }
                            }
                        ]
                    },
                    orderBy: {
                        id: "desc"
                    },
                    include: {
                        page1: true,
                        page2: true,
                        user1: true,
                        user2: true
                    }
                });
    
                resolve(result);
            } catch (error) {
                reject(new Error("Data error: " + error));
            }
        });
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
    },
    getFileByUser: async (id: number, id_user: number) => {
        const clash = await prisma.clash.findUnique({
          where: { id },
          include: {
            page1: true,
            page2: true,
          },
        });
      
        if (!clash) return 1;
      
        // Vérifie quel utilisateur correspond à id_user
        if (clash.id_user1 === id_user) {
          return clash.page1.id;
        } else{
          return clash.page2.id;
        }
      
        // L'utilisateur ne fait pas partie du clash
      }
}

export default clashModel;