import { Router } from "express";
import * as auth from '../controllers/auth';
import * as adminUsers from '../controllers/adminUsers';
import * as networks from '../controllers/networks';
import * as groups from '../controllers/groups';
import * as departaments from '../controllers/departaments';
import * as computers from '../controllers/computers';
import * as ipAddresses from '../controllers/ipAddresses';

const router = Router();

router.post('/login', auth.login );

router.get('/ping', auth.validate, (req, res)=> res.json({pong: true, admin:true}));

//model Admin
router.get('/admimusers', auth.validate, adminUsers.getAll);
router.get('/admimusers/:id', auth.validate, adminUsers.getAdminUser);
router.post('/adminusers', auth.validate, adminUsers.addUser);
router.put('/adminusers/:id', auth.validate, adminUsers.updateUser);
router.delete('/adminusers/:id', auth.validate, adminUsers.deleteUser);


//model Network_address
router.get('/networks', auth.validate, networks.getAll);
router.get('/networks/:id', auth.validate, networks.getOneNet);
router.post('/networks', auth.validate, networks.addNetwork);
router.put('/networks/:id', auth.validate, networks.updateAddress);
router.delete('/networks/:id', auth.validate, networks.deleteNetwork);

// Model Groups 
router.get('/groups', auth.validate, groups.getAll);
router.get('/groups/:id', auth.validate, groups.getOne);
router.post('/groups', auth.validate, groups.addGroup);
router.put('/groups/:id', auth.validate, groups.updateGroup);
router.delete('/groups/:id', auth.validate, groups.deleteGroup);

// Model Departaments 
router.get('/departaments', auth.validate, departaments.getAll);
router.get('/departaments/:id', auth.validate, departaments.getOne);
router.post('/departaments', auth.validate, departaments.addDepartament);
router.put('/departaments/:id', auth.validate, departaments.updateDepartament);
router.delete('/departaments/:id', auth.validate, departaments.deleteDepartament);

//Model Computers
router.get('/computers', auth.validate, computers.getAll);
router.get('/computers/:id', auth.validate, computers.getOneId);
router.post('/computers', auth.validate, computers.addComputer);
router.put('/computers/:id', auth.validate, computers.updateComputer);
router.delete('/computers/:id', auth.validate, computers.deleteComputer);

// Model AdressesIp
router.get('/addressesip', auth.validate, ipAddresses.getAll);
router.get('/addressesip/:id', auth.validate, ipAddresses.getOneId);
router.delete('/addressesip/:id', auth.validate, ipAddresses.deleteIpId);
router.get('/addressesip/search/ip', auth.validate, ipAddresses.searchIp);
router.delete('/addressesipdelete/:ip', auth.validate, ipAddresses.deleteIp);


export default router;