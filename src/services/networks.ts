import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"

export const getAll = async() => {
    try {
            return await prisma.network_address.findMany();

    }catch(err){ return false}

}

export const getOne = async(id: number) => {
    try {
        return await prisma.network_address.findFirst({where: {id}});

}catch(err){ return false}

}

export const validAddress = async (address: string) => {

    try {
        return await prisma.network_address.findUnique({where: {address}});

    }catch(err){ return false}

}

type NetworkCreateData = Prisma.Args<typeof prisma.network_address, 'create'>['data'];

export const add = async (data: NetworkCreateData) => {

    let correctData = data.address.split('.');
    correctData [correctData.length -1]= '0';
    let ip = correctData.join('.');
    
    data.address = ip;
    
    try{
        return await prisma.network_address.create({data});
    }catch(err) {return false}

}

type NetworkUdateData = Prisma.Args<typeof prisma.network_address, 'update'>['data'];

export const update = async (id: number, data: NetworkUdateData) => {

    try{

        return await prisma.network_address.update({where: {id}, data});

    }catch(err) {return false}

}

export const remove = async (id: number) => {
    try{
        return await prisma.network_address.delete({where: {id}});
    }catch(err) {return false}

}



