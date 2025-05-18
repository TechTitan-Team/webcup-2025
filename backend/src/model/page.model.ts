import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const pageModel = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.page.findMany({
                    orderBy: {
                        Reaction: {
                            _count: 'desc'
                        }
                    },
                    include: {
                        user: true,
                        Reaction: true
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: " + error))
            }
        })
    },
    getOne: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.page.findUnique({
                    where: {
                        id
                    },
                    include: {
                        user: true
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: " + error))
            }
        })
    },
    create: async (
        url: string,
        type: string,
        id_user: number,

        // file

    ) => {
        let result = await prisma.page.create({
            data: {
                url,
                type,
                id_user,

                // file

            }
        })
        return (result)

    },
    update: (
        id: number,
        url: string,
        type: string,
        id_user: number,

        // file

    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.page.update({
                    where: {
                        id
                    },
                    data: {
                        url,
                        type,
                        id_user,

                        // file

                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: " + error))
            }
        })
    },
    delete: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.page.delete({
                    where: {
                        id
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: " + error))
            }
        })
    },
}

export default pageModel;