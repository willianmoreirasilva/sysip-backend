import { prisma } from "../libs/prisma"


export const validateUser = async (email: string, password: string): Promise<boolean | undefined> => {

    const user = await prisma.admin.findUnique({
        where: {
            email
        }
    })

    if(!user) return false;

    if(user.password === password) return true;



}