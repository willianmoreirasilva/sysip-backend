import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"
import { hash } from "bcrypt";
import { randomInt } from "crypto";

export const getAll = async() => {
    try {
            return await prisma.admin.findMany();

    }catch(err){ return false}

}

export const getOne = async ( id: number ) => {
    try{
        return await prisma.admin.findFirst({where: {id}});
    }catch(err) {return false}

}

type AdminUsersCreateData = Prisma.Args<typeof prisma.admin, 'create'>['data'];

export const add = async (data: AdminUsersCreateData) => {
    const randomSalt = randomInt(10,16)
    data.password = await hash (data.password, randomSalt);
    
    try{
        return await prisma.admin.create({ data });

    }catch(err) {return false}
}

type AdminUsersUpdateData = Prisma.Args<typeof prisma.admin, 'update'>['data'];

export const update = async ( id: number, data: AdminUsersUpdateData) => {

    try{
        return await prisma.admin.update({ where: { id }, data});     

    }catch(err) {return false}
}

export const remove = async (id: number) => {
    try{
        return await prisma.admin.delete({ where: {id}});
    }catch(err) {return false}
}



