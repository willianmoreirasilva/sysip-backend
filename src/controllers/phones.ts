import { RequestHandler } from "express";
import { number, string, z } from "zod";
import * as printers from '../services/printers';
import * as ipAddresses from '../services/ipAddresses';
import * as phones from '../services/phones';
import * as networks from '../services/networks';
import { separeteAddress, separeteNetwork } from "../utils/separeteAddress";




export const getAll: RequestHandler = async (req, res ) => {
    
    const Phones = await phones.getAll();
    if(Phones) return res.json({phones:Phones})
   
    res.json({error: "Ocorreu um erro"});
     
 }

 export const getOneId: RequestHandler = async (req, res ) => {

    const { id } = req.params;
    const Phone = await phones.getOne(parseInt(id));
    if(Phone) return res.json({phone:Phone});

    res.json({error: "Ocorreu um erro"});
 }


 export const addPhone: RequestHandler = async(req, res) => {
   
    const addPhoneSchema = z.object({
        
        dpt_id: number().optional(),        
        network_ip_id: string().ip(),
        code: string().optional(),         
        phone_number: string(), 
        sector: string().optional(),       
        model: string().optional()        
        
    })
    
    const body = addPhoneSchema.safeParse(req.body);
   
    if(!body.success) return res.json({error:'Dados Inválidos'});


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
        
        if(!newIp) return res.json({error: 'nao foi possível adicionar esse ip'});
    
    }
    
    const newPhone = await phones.addPhone (body.data);

    if(newPhone) return res.status(201).json({phone: newPhone});

    res.json({error: 'Ocorreu um erro'});

}


export const updatePhone: RequestHandler = async ( req, res ) => {

    const { id } = req.params;
    
    
    const phone = await phones.getOne(parseInt(id));
    if(!phone) return res.json({error: 'ocorreu um erro de id'})
    
    let deletedIdIp = 0;
    if(phone.network_ip_id){
        const addressOld = await ipAddresses.getIp(phone.network_ip_id);
        if(addressOld) deletedIdIp = addressOld.id;
    }

    const updatePhoneSchema = z.object({
        
        dpt_id: number().optional(),        
        network_ip_id: string().ip().optional(),
        code: string().optional().optional(),         
        phone_number: string().optional(),
        sector: string().optional().optional(),       
        model: string().optional()        
        
    })

    const body = updatePhoneSchema.safeParse(req.body);
    
    if(!body.success || Object.keys(body.data).length ===0) return res.json({error:'Dados Inválidos'});
    
    let data: phones.PhoneUpdateData = {}

    data = {
        
        dpt_id : body.data.dpt_id,
        network_ip_id : body.data.network_ip_id,
        sector : body.data.sector,
        code : body.data.code,
        model: body.data.model,
        phone_number: body.data.phone_number
    
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

    const updatePhone = await phones.update(parseInt(id),data);
    
    if(body.data.network_ip_id){
        const deletedIp = await ipAddresses.deleteIpId(deletedIdIp);
    }

    if (updatePhone) return res.json({phone: updatePhone});
    
    
    res.json({error:'Ocorreu um erro'});
    
}

export const deletePhone: RequestHandler = async ( req, res ) =>{
    const { id } = req.params;

    const deletedPhone = await phones.getOne(parseInt(id));
    let addressRemove;
    if(!deletedPhone) return res.json({error: 'Não Cadastrado'});
    let deletedIp = deletedPhone.network_ip_id;
    
    
    if(deletedIp){
        const deletedPhone = await phones.remove(parseInt(id));
        addressRemove = await ipAddresses.deleteIp(deletedIp);
    }
    
    if(deletedPhone || addressRemove) return res.json([{deletedPhone:deletedPhone}, {deletediP: addressRemove}]);
    
    
    res.json ({error: 'Ocorreu um erro'});

}

export const search: RequestHandler = async (req, res) => {

    const searchSchema = z.object({
        dpt_id: string().transform(val=> parseInt(val)).optional(),
        network_id: string().transform(val=> parseInt(val)).optional(),
        code: string().optional(),
        sector: string().optional(),
        model: string().optional(),
        phone_number: string().optional(), 
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
    
    let data : phones.searchFiltersPhone = {}
    data = {
        dpt_id: query.data.dpt_id,
        address,
        code: query.data.code,
        sector: query.data.sector,
        phone_number: query.data.phone_number,
        model: query.data.model,
        skip: query.data.skip,
        take: query.data.take
    }
    
    const searchPhones = await phones.search(data);

    if(searchPhones) return res.json({phones: searchPhones});

    res.json({error: 'Ocorreu um erro'});

}