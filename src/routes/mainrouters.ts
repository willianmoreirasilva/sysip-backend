import { Router } from "express";
import * as auth from "../controllers/auth";
import * as adminUsers from "../controllers/adminUsers";
import * as networks from "../controllers/networks";
import * as groups from "../controllers/groups";
import * as departaments from "../controllers/departaments";
import * as computers from "../controllers/computers";
import * as ipAddresses from "../controllers/ipAddresses";
import * as printers from "../controllers/printers";
import * as phones from "../controllers/phones";

const router = Router();
// login e logout
router.post("/login", auth.login);
router.get("/logout", auth.validate, auth.logout);

// route test api
router.get("/ping", (req, res) => res.json({ pong: true }));
router.get("/private/ping", auth.validate, (req, res) =>
    res.json({ pong: true, private: true })
);

//model Admin
router.get("/admimusers", auth.validate, adminUsers.getAll);
router.get("/admimusers/:id", auth.validate, adminUsers.getAdminUser);
router.post("/adminusers", auth.validate, adminUsers.addUser);
router.put("/adminusers/:id", auth.validate, adminUsers.updateUser);
router.delete("/adminusers/:id", auth.validate, adminUsers.deleteUser);

// get user logged
router.get("/adminusers/me", auth.validate, adminUsers.getMe);

// Model Groups
router.get("/groups", auth.validate, groups.getAll);
router.get("/groups/:id", auth.validate, groups.getOne);
router.post("/groups", auth.validate, groups.addGroup);
router.put("/groups/:id", auth.validate, groups.updateGroup);
router.delete("/groups/:id", auth.validate, groups.deleteGroup);

// Model Departaments
router.get("/departaments", auth.validate, departaments.getAll);
router.get("/departaments/:id", auth.validate, departaments.getOne);
router.post("/departaments", auth.validate, departaments.addDepartament);
router.put("/departaments/:id", auth.validate, departaments.updateDepartament);
router.delete(
    "/departaments/:id",
    auth.validate,
    departaments.deleteDepartament
);

//model Network_address
router.get("/networks", auth.validate, networks.getAll);
router.get("/networks/:id", auth.validate, networks.getOneNet);
router.post("/networks", auth.validate, networks.addNetwork);
router.put("/networks/:id", auth.validate, networks.updateAddress);
router.delete("/networks/:id", auth.validate, networks.deleteNetwork);

// Model AdressesIp
router.get("/addressesip", auth.validate, ipAddresses.getAll);
router.get("/addressesip/:id", auth.validate, ipAddresses.getOneId);
router.get("/search/addressesip", auth.validate, ipAddresses.searchIp);

//Model Computers
router.get("/computers", auth.validate, computers.getAll);
router.get("/computers/:id", auth.validate, computers.getOneId);
router.get("/search/computers", auth.validate, computers.search);
router.post("/computers", auth.validate, computers.addComputer);
router.put("/computers/:id", auth.validate, computers.updateComputer);
router.delete("/computers/:id", auth.validate, computers.deleteComputer);

//Model Printers
router.get("/printers", auth.validate, printers.getAll);
router.get("/printers/:id", auth.validate, printers.getOneId);
router.get("/search/printers", auth.validate, printers.search);
router.post("/printers", auth.validate, printers.addPrinter);
router.put("/printers/:id", auth.validate, printers.updatePrinter);
router.delete("/printers/:id", auth.validate, printers.deletePrinter);

//Model Phones
router.get("/phones", auth.validate, phones.getAll);
router.get("/phones/:id", auth.validate, phones.getOneId);
router.get("/search/phones", auth.validate, phones.search);
router.post("/phones", auth.validate, phones.addPhone);
router.put("/phones/:id", auth.validate, phones.updatePhone);
router.delete("/phones/:id", auth.validate, phones.deletePhone);

export default router;
