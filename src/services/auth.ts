import { prisma } from "../libs/prisma"
import { UserAdmin } from "../types/UserAdmin";
import { getToday } from "../utils/getToday";

export const validateUser = async (email: string, password: string): Promise<UserAdmin | boolean > => {

    const user = await prisma.admin.findUnique({
        where: { email }
    })
    
    return(user?.email === email && user.password === password);
        
}

export const createToken = () => {
    const key = getToday().split('/').join('');
    return `${process.env.DEFAULT_TOKEN}${key}`
}

export const validateToken = (token: string) => {
    const currentToken = createToken();
    return token === currentToken;
}