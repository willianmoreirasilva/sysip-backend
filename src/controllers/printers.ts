import { RequestHandler } from "express";
import { number, string, z } from "zod";
import * as printers from "../services/printers";
import * as ipAddresses from "../services/ipAddresses";
import * as networks from "../services/networks";
import { separeteAddress, separeteNetwork } from "../utils/separeteAddress";

export const getAll: RequestHandler = async (req, res) => {
    const Printers = await printers.getAll();
    if (Printers) return res.json({ Printers: Printers });

    res.json({ error: "Ocorreu um erro" });
};

export const getOneId: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const Printer = await printers.getOne(parseInt(id));
    if (Printer) return res.json({ printer: Printer });

    res.json({ error: "Ocorreu um erro" });
};

export const addPrinter: RequestHandler = async (req, res) => {
    const addPrinterSchema = z.object({
        network_ip_id: string().ip().optional(),
        dpt_id: number().optional(),
        sector: string().optional(),
        hostname: string().optional(),
        model: string(),
        serial: string(),
        description: string().optional(),
        code: string().optional(),
    });

    const body = addPrinterSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados Inválidos" });

    if (body.data.network_ip_id) {
        const inUseIp = await ipAddresses.getIp(body.data.network_ip_id);
        if (inUseIp) return res.json({ error: "Endereço de IP em uso" });

        const address = separeteAddress(body.data.network_ip_id);

        const addressNetwork = await networks.validAddress(
            address.networkAddress
        );

        if (!addressNetwork)
            return res.json({
                error: "Endereço de rede inválido para a Organização",
            });

        const newIp = await ipAddresses.add({
            network_id: addressNetwork.id,
            ip: address.IpAddress,
            network_ip: body.data.network_ip_id,
        });

        if (!newIp)
            return res.json({ error: "nao foi possível adicionar esse ip" });
    }

    const newPrinter = await printers.addPrinter(body.data);

    if (newPrinter) return res.status(201).json({ printer: newPrinter });

    res.json({ error: "Ocorreu um erro" });
};

export const updatePrinter: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const printer = await printers.getOne(parseInt(id));
    if (!printer) return res.json({ error: "ocorreu um erro de id" });

    let deletedIdIp = 0;
    if (printer.network_ip_id) {
        const addressOld = await ipAddresses.getIp(printer.network_ip_id);
        if (addressOld) deletedIdIp = addressOld.id;
    }

    const updatePrinterSchema = z.object({
        dpt_id: number().optional(),
        network_ip_id: string().ip().optional(),
        sector: string().optional(),
        hostname: string().optional(),
        model: string().optional(),
        serial: string().optional(),
        description: string().optional(),
        code: string().optional(),
    });

    const body = updatePrinterSchema.safeParse(req.body);

    if (!body.success || Object.keys(body.data).length === 0)
        return res.json({ error: "Dados Inválidos" });

    let data: printers.PrinterUpdateData = {};

    data = {
        dpt_id: body.data.dpt_id,
        network_ip_id: body.data.network_ip_id,
        sector: body.data.sector,
        hostname: body.data.hostname,
        model: body.data.model,
        serial: body.data.serial,
        description: body.data.description,
        code: body.data.code,
    };

    if (body.data.network_ip_id) {
        const inUseIp = await ipAddresses.getIp(body.data.network_ip_id);
        if (inUseIp) return res.json({ error: "Endereço de IP em uso" });

        const address = separeteAddress(body.data.network_ip_id);

        const addressNetwork = await networks.validAddress(
            address.networkAddress
        );

        if (!addressNetwork)
            return res.json({
                error: "Endereço de rede inválido para a Organização",
            });

        const newIp = await ipAddresses.add({
            network_id: addressNetwork.id,
            ip: address.IpAddress,
            network_ip: body.data.network_ip_id,
        });

        if (newIp) data.network_ip_id = newIp.network_ip;
    }

    const updatePrinter = await printers.update(parseInt(id), data);

    if (body.data.network_ip_id) {
        const deletedIp = await ipAddresses.deleteIpId(deletedIdIp);
    }

    if (updatePrinter) return res.json({ Printer: updatePrinter });

    res.json({ error: "Ocorreu um erro" });
};

export const deletePrinter: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deletedPrint = await printers.getOne(parseInt(id));
    let addressRemove;
    if (!deletedPrint) return res.json({ error: "Não Cadastrado" });
    let deletedIp = deletedPrint.network_ip_id;

    if (deletedIp) {
        addressRemove = await ipAddresses.deleteIp(deletedIp);
    }
    const remove = await printers.remove(parseInt(id));

    if (remove || addressRemove)
        return res.json([
            { deletedPrint: deletedPrint },
            { deletediP: addressRemove },
        ]);

    res.json({ error: "Ocorreu um erro" });
};

export const search: RequestHandler = async (req, res) => {
    const searchSchema = z.object({
        dpt_id: string()
            .transform((val) => parseInt(val))
            .optional(),
        network_ip_id: string().ip().optional(),
        code: string().optional(),
        sector: string().optional(),
        hostname: string().optional(),
        model: string().optional(),
        serial: string().optional(),
        description: string().optional(),
        skip: string()
            .transform((val) => parseInt(val))
            .optional(),
        take: string()
            .transform((val) => parseInt(val))
            .optional(),
    });

    const query = searchSchema.safeParse(req.query);

    if (!query.success || Object.keys(query.data).length === 0)
        return res.json({ error: "Dados inválidos" });

    if (query.data.network_ip_id) {
        const host = await ipAddresses.getIp(query.data.network_ip_id);
        if (!host) return res.json({ error: "Endereço de IP não encontrado" });
        if (!host.printer) {
            return res.json({
                error: `O IP informado está associado ${
                    host.pc ? "a um computador" : "a um telefone VoIP"
                }`,
            });
        }
        return res.json({ printer: host.printer });
    }

    let data: printers.searchFiltersPrinter = {};
    data = {
        dpt_id: query.data.dpt_id,
        code: query.data.code,
        sector: query.data.sector,
        hostname: query.data.hostname,
        model: query.data.model,
        serial: query.data.serial,
        description: query.data.description,
    };

    const searchPrinters = await printers.search(data);

    if (searchPrinters) return res.json({ printers: searchPrinters });

    res.json({ error: "Ocorreu um erro" });
};
