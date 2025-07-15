import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getAll = async () => {
    try {
        return await prisma.print.findMany();
    } catch (error) {
        false;
    }
};

export const getOne = async (id: number) => {
    try {
        return await prisma.print.findFirst({ where: { id } });
    } catch (error) {
        false;
    }
};

type PrinterCreateData = Prisma.Args<typeof prisma.print, "create">["data"];

export const addPrinter = async (data: PrinterCreateData) => {
    try {
        return await prisma.print.create({ data });
    } catch (err) {
        return false;
    }
};

export type PrinterUpdateData = Prisma.Args<
    typeof prisma.print,
    "update"
>["data"];

export const update = async (id: number, data: PrinterUpdateData) => {
    try {
        return await prisma.print.update({ where: { id }, data });
    } catch (err) {
        return false;
    }
};

export const remove = async (id: number) => {
    try {
        return await prisma.print.delete({ where: { id } });
    } catch (err) {
        false;
    }
};

export type searchFiltersPrinter = {
    dpt_id?: number;
    code?: string;
    sector?: string;
    hostname?: string;
    serial?: string;
    model?: string;
    description?: string;
    skip?: number;
    take?: number;
};

export const search = async (data: searchFiltersPrinter) => {
    try {
        return await prisma.print.findMany({
            where: {
                dpt_id: data.dpt_id,
                code: data.code,
                sector: {
                    contains: data.sector,
                    mode: "insensitive",
                },
                hostname: {
                    contains: data.hostname,
                    mode: "insensitive",
                },
                serial: {
                    contains: data.serial,
                    mode: "insensitive",
                },
                model: {
                    contains: data.model,
                    mode: "insensitive",
                },
                description: {
                    contains: data.description,
                    mode: "insensitive",
                },
            },
            skip: data.skip,
            take: data.take,
        });
    } catch (err) {
        return false;
    }
};
