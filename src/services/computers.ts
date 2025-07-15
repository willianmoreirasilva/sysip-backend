import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getAll = async () => {
    try {
        return await prisma.computer.findMany();
    } catch (err) {
        return false;
    }
};

export const getOnePCId = async (id: number) => {
    try {
        return await prisma.computer.findFirst({ where: { id } });
    } catch (err) {
        return false;
    }
};

export const getOnePCIp = async (ip: string) => {
    try {
        return await prisma.computer.findFirst({
            where: { network_ip_id: ip },
        });
    } catch (err) {
        return false;
    }
};

type ComputerCreateData = Prisma.Args<typeof prisma.computer, "create">["data"];

export const addPc = async (data: ComputerCreateData) => {
    try {
        return await prisma.computer.create({ data });
    } catch (err) {
        return false;
    }
};

export type ComputerUpdateData = Prisma.Args<
    typeof prisma.computer,
    "update"
>["data"];

export const update = async (id: number, data: ComputerUpdateData) => {
    try {
        return await prisma.computer.update({ where: { id }, data });
    } catch (err) {
        return false;
    }
};

export const remove = async (id: number) => {
    try {
        return await prisma.computer.delete({ where: { id } });
    } catch (err) {
        false;
    }
};

export type searchFiltersPc = {
    dpt_id?: number;
    group_id?: number;
    address?: string;
    code?: string;
    user?: string;
    sector?: string;
    hostname?: string;
    mac?: string;
    processor?: string;
    mem?: string;
    hd?: string;
    so?: string;
    skip?: number;
    take?: number;
};

export const search = async (data: searchFiltersPc) => {
    try {
        return await prisma.computer.findMany({
            where: {
                dpt_id: data.dpt_id,
                group_id: data.group_id,
                network_ip_id: data.address,

                code: data.code,
                user: {
                    contains: data.user,
                    mode: "insensitive",
                },
                sector: {
                    contains: data.sector,
                    mode: "insensitive",
                },
                hostname: {
                    contains: data.hostname,
                    mode: "insensitive",
                },
                mac: data.mac,
                processor: {
                    contains: data.processor,
                    mode: "insensitive",
                },
                mem: {
                    contains: data.mem,
                    mode: "insensitive",
                },
                hd: {
                    contains: data.hd,
                    mode: "insensitive",
                },
                so: {
                    contains: data.so,
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
