import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"


export const getAll = async() => {
    try {
            return await prisma.departament.findMany();

    }catch(err){ return false}

}

export const getOne = async(id: number) => {
    try {
            return await prisma.departament.findFirst({where: {id}});

    }catch(err){ return false}

}
type DepartamentCreateData = Prisma.Args<typeof prisma.departament, 'create'>['data'];

export const add = async (data: DepartamentCreateData) => {

    try{
        return await prisma.departament.create({data});
    }catch(err) {return false}

}

type DepartametUpdateData = Prisma.Args<typeof prisma.departament, 'update'>['data'];
export const update = async ( id: number, data: DepartametUpdateData) => {

    try{
        return await prisma.departament.update({where: {id}, data});
    }catch(err) {return false}

}

export const remove = async (id: number ) => {

    try{
        return await prisma.departament.delete({where: {id}});
    }catch(err) {return false}

}