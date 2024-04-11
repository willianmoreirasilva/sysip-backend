import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"


export const getAll = async() => {
    try {
            return await prisma.group.findMany();

    }catch(err){ return false}

}

export const getOne = async(id: number) => {
    try {
            return await prisma.group.findFirst({where: {id}});

    }catch(err){ return false}

}
type GroupCreateData = Prisma.Args<typeof prisma.group, 'create'>['data'];

export const add = async (data: GroupCreateData) => {

    try{
        return await prisma.group.create({data});
    }catch(err) {return false}

}
type GroupUpdateData = Prisma.Args<typeof prisma.group, 'update'>['data'];
export const update = async ( id: number, data: GroupUpdateData) => {

    try{
        return await prisma.group.update({where: {id}, data});
    }catch(err) {return false}

}

export const remove = async (id: number ) => {

    try{
        return await prisma.group.delete({where: {id}});
    }catch(err) {return false}

}