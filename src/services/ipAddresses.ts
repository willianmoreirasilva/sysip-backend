import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"
import { separateNetworkIp } from "../types/SeparateNetworkIp";



export const getAll = async( ) => {
    
    try {
        return await prisma.ip_address.findMany();    

    } catch (err) {return false}

}


export const getOne = async( id: number) => {
    try {
        return await prisma.ip_address.findFirst({where: {id}});
    } catch (error) {return false }
        
}

export const getIp = async(ip: string) => {
    try{
        return await prisma.ip_address.findFirst({where: {
            network_ip: ip
        }})
    
       
    }catch(err) {return false}
    
}

type IpAddresssesCreateData = Prisma.Args<typeof prisma.ip_address, 'create'>['data'];
export const add = async (data: IpAddresssesCreateData) => {

    try{
        return await prisma.ip_address.create({data});
    }catch(err) {return false}

}

export const deleteIpId = async (id: number) => {
    
    try {
        return await prisma.ip_address.delete({where: {id}});
    } catch (err) {return false}

}

