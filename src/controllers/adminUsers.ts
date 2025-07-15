import { RequestHandler } from "express";
import * as adminUsers from '../services/adminUsers';
import { z } from "zod";




export const getAll: RequestHandler = async( req, res ) => {
    const users = await adminUsers.getAll();
    
    if (users) return res.json({adminUsers: users});

    res.json({ error: 'Ocorreu um erro'});
}

export const getAdminUser: RequestHandler = async ( req, res ) => {
    const { id } = req.params;
    const user = await adminUsers.getOne(parseInt(id));

    if (user) return res.json({user});

    res.json({ error: 'Ocorreu um erro'});
}

export const addUser: RequestHandler = async ( req, res ) => {
    
    const addAdminUserSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['ADMIN', 'USER']).optional()
       
    })

    const body = addAdminUserSchema.safeParse(req.body);

    if(!body.success) return res.json( {error: 'Dados inválidos' });

    
    const newUser = await adminUsers.add(body.data);
    
    if(newUser) return res.status(201).json({user: newUser});

    res.json({ error: 'Ocorreu um erro'});
    
}

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    
    const UpdateUserSchema = z.object({
        email: z.string().email().optional(),
        password: z.string().optional(),
        role: z.enum(['ADMIN', 'USER']).optional()
    })

    const body = UpdateUserSchema.safeParse(req.body);

    if(!body.success) return res.json({error: 'Dados inválidos'});

    const updateUser = await adminUsers.update(parseInt(id), body.data);

    if(updateUser){
        return res.json({user: updateUser});
    }
    
    res.json({error: 'Ocorreu um erro'});

}

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deleteUser = await adminUsers.remove(parseInt(id));

    if(deleteUser) return res.json({user: deleteUser});

    res.json({error: 'Ocorreu um erro'});




}