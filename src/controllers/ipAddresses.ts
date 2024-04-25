import { RequestHandler } from "express";
import * as ipAddresses from '../services/ipAddresses';
import { string, z } from "zod";


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



export const deleteIpId: RequestHandler = async (req, res ) => {
    const { id } = req.params;

    const address = await ipAddresses.deleteIpId(parseInt(id));

    if(address) return res.json({removed: address});

    res.json({error: 'Ocorreu um erro'})
        
}