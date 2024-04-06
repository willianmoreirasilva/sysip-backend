import { RequestHandler } from "express";
import * as networks from '../services/networks';
import { z } from "zod";

export const getAll: RequestHandler = async( req, res ) => {
    
    const addresses = await networks.getAll();
    if(addresses) return res.json({networks: addresses});

    res.json({ error: 'Ocorreu um erro'});    
}

export const getOneNet: RequestHandler = async ( req, res ) => {
    const { id } = req.params;
    const address = await networks.getOne(parseInt(id));

    if(address) return res.json({network: address});

    res.json({ error: 'Ocorreu um erro'});  

}


export const addNetwork: RequestHandler = async ( req, res ) => {
    
    const AddNetworkSchema = z.object({
        address: z.string().ip()
    })

    const body = AddNetworkSchema.safeParse(req.body);
    
    if(!body.success) return res.json({error: 'Ocorreu um erro'});

    const newAddress = await networks.add(body.data);
    if(newAddress) return res.status(201).json({address: newAddress});

    res.json({error: 'Ocorreu um erro'});

}

export const updateAddress: RequestHandler =  async (req, res) => {
    const { id } = req.params;

    const AddNetworkSchema = z.object({
        address: z.string().ip()
    })

    const body = AddNetworkSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Ocorreu um erro'});

    const updatedAddress = await networks.update(parseInt(id), body.data);

    if(updatedAddress) return res.json({address: updatedAddress});
    res.json({error: 'Ocorreu um erro'});



}

export const deleteNetwork: RequestHandler = async (req, res) => {

    const { id } = req.params;

    const deleteAddress = await networks.remove(parseInt(id));
    if(deleteAddress) return res.json({Network: deleteAddress});

    res.json({error: 'Ocorreu um erro'});

}