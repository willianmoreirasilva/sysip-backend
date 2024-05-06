import { RequestHandler } from "express";
import * as ipAddresses from '../services/ipAddresses';
import * as networks from "../services/networks";
import { string, z } from "zod";
import { separeteAddress } from "../utils/separeteAddress";



export const getAll: RequestHandler =  async ( req, res )=> {

    const addressesIp = await ipAddresses.getAll();
    if(addressesIp) return res.json({addressesIp});
    
    res.json({error: 'Ocorreu um erro'});

}

export const getOneId: RequestHandler = async ( req, res ) => {
    const { id } = req.params;
    const addressIp = await ipAddresses.getOne(parseInt(id));

    if(addressIp) return res.json({addressIp: addressIp});
    res.json({error: 'Ocorreu um erro'});
}

export const searchIp: RequestHandler = async (req, res ) => {
 
    const searchIpSchema = z.object({
        ip: string().ip()
    });

    const query = searchIpSchema.safeParse(req.query);
    if(!query.success) return res.json({error: 'Dados inválidos'});

    const address = separeteAddress(query.data.ip);

    const addressNetwork = await networks.validAddress(address.networkAddress);
  
    if(!addressNetwork) return res.json({error: 'Endereço de rede inválido para a Organização'})

    const host = await ipAddresses.getIp(query.data.ip);
    
    if(host){
        return res.json({host});
    }else{
        return res.json({error: 'Endereço IP não encontrado'});
    }

    
   

}


export const deleteIpId: RequestHandler = async (req, res ) => {
    const { id } = req.params;

    const address = await ipAddresses.deleteIpId(parseInt(id));

    if(address) return res.json({removedIp: address});

    res.json({error: 'Ocorreu um erro'})
        
}

export const deleteIp: RequestHandler = async (req, res ) => {
    const { ip } = req.params;

    const address = await ipAddresses.deleteIp(ip);
   
    if(address) return res.json({removedIp: address});
   
    res.json({error: 'Ocorreu um erro'})
        
}