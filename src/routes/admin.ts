import { Router } from "express";
import * as auth from '../controllers/auth';
import * as adminUsers from '../controllers/adminUsers';
import * as networks from '../controllers/networks';

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


export default router;