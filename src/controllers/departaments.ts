import { RequestHandler } from "express";
import * as departaments from '../services/departaments';
import { string, z } from "zod";

export const getAll: RequestHandler = async ( req, res ) =>{

    const dpts = await departaments.getAll();
    
    if(dpts) return res.json({departaments: dpts});

    res.json({ error: 'Ocorreu um erro'});    
}

export const getOne: RequestHandler = async ( req, res ) =>{
    const { id } = req.params;

    const dpt = await departaments.getOne(parseInt(id));

    if(dpt) return res.json({departament: dpt});

    res.json({error: "Ocorreu um erro"});
}

export const addDepartament: RequestHandler = async ( req, res ) =>{

   const addDepartamentSchema = z.object({
        name: string()
   });

    const body = addDepartamentSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Ocorreu um erro'})
    
    const newDepartament = await departaments.add(body.data);
    if(newDepartament) return res.status(201).json({departament: newDepartament});

    res.json({error: 'Ocorreu um erro'});

    
}

export const updateDepartament: RequestHandler = async ( req, res ) =>{
    const { id } = req.params;

    const updateDepartamentSchema = z.object({
        name: string()
    })
    
    const body = updateDepartamentSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Ocorreu um erro'});

    const updatedDpt = await departaments.update(parseInt(id), body.data);
    if(updatedDpt) return res.json({departament: updatedDpt});

    res.json({error: 'Ocorreu um erro'});
}

export const deleteDepartament: RequestHandler = async ( req, res ) =>{

    const { id } = req.params;
    const deletedDpt = await departaments.remove(parseInt(id));

    if(deletedDpt) return res.json({departament: deletedDpt});

    res.json({error: 'Ocorreu um erro'});

    
}