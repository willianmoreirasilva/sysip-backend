import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"



export const getAll = async () => {

    try{
        return await prisma.computer.findMany();
    }catch(err) {return false}

}


export const getOnePCId = async (id: number) => {

    try {
        return await prisma.computer.findFirst({where: {id}})
    } catch (err) {return false}
}


type ComputerCreateData = Prisma.Args<typeof prisma.computer, 'create'>['data'];

export const addPc = async(data: ComputerCreateData) => {

try{
    return await prisma.computer.create({data});
    
}catch(err) {return false}

}

export type ComputerUpdateData = Prisma.Args<typeof prisma.computer, 'update'>['data'];

export const update = async ( id: number, data: ComputerUpdateData ) => {
    try {
        return await prisma.computer.update({where: {id}, data});
    } catch (err) {return false}
}