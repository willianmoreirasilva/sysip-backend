import { RequestHandler } from "express";
import * as groupsService from '../services/groups';
import { string, z } from "zod";


export const getAll: RequestHandler = async ( req, res ) => {

    const groups = await groupsService.getAll();

    if(groups) return res.json({groups});

    res.json({ error: 'Ocorreu um erro'});    

}

export const getOne: RequestHandler = async( req, res)  => {

    const { id } = req.params;
    
    const group = await groupsService.getOne(parseInt(id));

    if(group) return res.json({group});

    res.json({ error: 'Ocorreu um erro'});    

}


export const addGroup: RequestHandler = async ( req, res ) => {
   
    const addGroupSchema = z.object({
        name: string()
        .transform((val)=> val.toUpperCase())
    });

    const body = addGroupSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Ocorreu um erro'});

    const newGroup = await groupsService.add(body.data);
    if(newGroup) return res.status(201).json({group: newGroup});

    res.json({error: 'Ocorreu um erro'});
}

export const updateGroup: RequestHandler =  async( req, res ) => {
    const { id } = req.params;

    const addGroupSchema = z.object({
        name: string()
        .transform((val)=> val.toUpperCase())
    });

    const body = addGroupSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Ocorreu um erro'});

    const updatedGroup = await groupsService.update(parseInt(id),body.data);
    if(updatedGroup) return res.json({group: updatedGroup});

    res.json({error: 'Ocorreu um erro'});




}

export const deleteGroup: RequestHandler = async (req, res) => {
    
    const { id } = req.params;
    const deletedGroup = await groupsService.remove(parseInt(id));

    if(deletedGroup) return res.json({group: deletedGroup});

    res.json({error: 'Ocorreu um erro'});


    
}