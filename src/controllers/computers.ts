
import { RequestHandler } from "express";
import { number, string, z } from "zod";
import * as computers from '../services/computers';
import * as ipAddresses from '../services/ipAddresses';
import * as networks from '../services/networks';
import { separeteAddress, separeteNetwork } from "../utils/separeteAddress";




export const getAll: RequestHandler = async (req, res ) => {
    
   const Computers = await computers.getAll();
    if(Computers) return res.json({computers: Computers});
   
    res.json({error: "Ocorreu um erro"});
    
}


export const getOneId: RequestHandler = async (req, res ) => {
    const { id } = req.params

    const computer = await computers.getOnePCId(parseInt(id));
    if(computer) return res.json({computer: computer})

    res.json({error: "Ocorreu um erro"});
    
}

export const addComputer: RequestHandler = async(req, res) => {
   
    const addComputerSchema = z.object({
        
        dpt_id: number(),
        group_id: number(),
        network_ip_id: string().ip(),
        user: string(),
        sector: string().optional(),
        hostname: string().optional(),
        mac: string().regex(/^(([0-9a-f]{2}):){5}([0-9a-f]{2})$/).optional(),
        processor: string().optional(),
        mem: string().optional(),
        hd: string().optional(),
        so: string().optional()
        
    })

    const body = addComputerSchema.safeParse(req.body);
  
    if(!body.success) return res.json({error:'Dados Inválidos'});

    
    const inUseIp = await ipAddresses.getIp(body.data.network_ip_id);
    if(inUseIp) return res.json({error: 'Endereço de IP em uso'})

    const address = separeteAddress(body.data.network_ip_id);

    const addressNetwork = await networks.validAddress(address.networkAddress);
  
    if(!addressNetwork) return res.json({error: 'Endereço de rede inválido para a Organização'})

    const newIp = await ipAddresses.add({
        network_id: addressNetwork.id,
        ip: address.IpAddress,
        network_ip: body.data.network_ip_id
    });

    if(!newIp) return res.json({error: 'nao foi possível adicionar esse ip'});

    const newPC = await computers.addPc(body.data);

    if(newPC) return res.status(201).json({computer: newPC});

    res.json({error: 'Ocorreu um erro'});

}


export const updateComputer: RequestHandler = async ( req, res ) => {

    const { id } = req.params;
    
    
    const computer = await computers.getOnePCId(parseInt(id));
    if(!computer) return res.json({error: 'ocorreu um erro de id'})
    
    let deletedIdIp = 0;
    
    const addressOld = await ipAddresses.getIp(computer.network_ip_id);
    if(addressOld) deletedIdIp = addressOld.id;
    
    const updateComputerSchema = z.object({
        dpt_id: number().optional(),
        group_id: number().optional(),
        network_ip_id: string().ip().optional(),
        user: string().optional(),
        sector: string().optional(),
        hostname: string().optional(),
        mac: string().regex(/^(([0-9a-f]{2}):){5}([0-9a-f]{2})$/).optional(),
        processor: string().optional(),
        mem: string().optional(),
        hd: string().optional(),
        so: string().optional()
    });

    const body = updateComputerSchema.safeParse(req.body);
    if(!body.success || Object.keys(body.data).length ===0) return res.json({error:'Dados Inválidos'});
    
    let data: computers.ComputerUpdateData = {}

    data = {
        
        dpt_id : body.data.dpt_id,
        group_id : body.data.group_id,
        network_ip_id : body.data.network_ip_id,
        user : body.data.user,
        sector : body.data.sector,
        hostname : body.data.hostname,
        mac : body.data.mac,
        processor : body.data.processor,
        mem : body.data.mem,
        hd : body.data.hd,
        so : body.data.so

    }

    if(body.data.network_ip_id){
        
        const inUseIp = await ipAddresses.getIp(body.data.network_ip_id);
        if(inUseIp) return res.json({error: 'Endereço de IP em uso'})
        
        const address = separeteAddress(body.data.network_ip_id);

        const addressNetwork = await networks.validAddress(address.networkAddress);
      
        if(!addressNetwork) return res.json({error: 'Endereço de rede inválido para a Organização'})

        const newIp = await ipAddresses.add({
            network_id: addressNetwork.id,
            ip: address.IpAddress,
            network_ip: body.data.network_ip_id
        }); 
        
        if(newIp) data.network_ip_id = newIp.network_ip;

    }

    const updatePc = await computers.update(parseInt(id),data);
    
    if(body.data.network_ip_id){
        const deletedIp = await ipAddresses.deleteIpId(deletedIdIp);
    }

    if (updatePc) return res.json({Computer: updatePc});
    
    
    res.json({error:'Ocorreu um erro'});
    
}

export const deleteComputer: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const Computer = await computers.getOnePCId(parseInt(id));
   
    if(!Computer) return res.json({error: 'Não Cadastrado'});
    let deletedIp = Computer.network_ip_id;
    
    

    const deletedPc = await computers.remove(parseInt(id));
    const addressRemove = await ipAddresses.deleteIp(deletedIp);

    if(deletedPc || addressRemove) return res.json([{deletedPc:deletedPc}, {deletediP: addressRemove}]);
    
    
    res.json ({error: 'Ocorreu um erro'});

}

export const search: RequestHandler = async (req, res) => {

    const searchSchema = z.object({
        dpt_id: string().transform(val=> parseInt(val)).optional(),
        group_id: string().transform(val=> parseInt(val)).optional(),
        network_id: string().transform(val=> parseInt(val)).optional(),
        code: string().optional(),
        user: string().optional(),
        sector: string().optional(),
        hostname: string().optional(),
        mac: string().regex(/^(([0-9a-f]{2}):){5}([0-9a-f]{2})$/).optional(),
        processor: string().optional(),
        mem: string().optional(),
        hd: string().optional(),
        so: string().optional(),
        skip: string().transform(val=> parseInt(val)).optional(),
        take: string().transform(val=> parseInt(val)).optional()

    });

    const query = searchSchema.safeParse(req.query);

    if(!query.success || Object.keys(query.data).length ===0) return res.json({error: 'Dados inválidos'});


    
    let address;
    if(query.data.network_id){
        const network  = await networks.getOne(query.data.network_id);
        if(!network) return res.json({error: 'rede inválida'})
        address = network? network.address : '';
        address = separeteNetwork(address);
        
    }
    
    let data : computers.searchFiltersPc = {}
    data = {
        dpt_id: query.data.dpt_id,
        group_id: query.data.group_id,
        address,
        code: query.data.code,
        user: query.data.user,
        sector: query.data.sector,
        hostname: query.data.hostname,
        mac: query.data.mac,
        processor: query.data.processor,
        mem: query.data.mem,
        hd: query.data.hd,
        so: query.data.so,
        skip: query.data.skip,
        take: query.data.take
    }
    
    const searchComputers = await computers.search(data);

    if(searchComputers) return res.json({computers: searchComputers});

    res.json({error: 'Ocorreu um erro'});

}