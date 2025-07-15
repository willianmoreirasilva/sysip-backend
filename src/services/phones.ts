import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getAll = async () => {
    try {
        return await prisma.phone.findMany();
    } catch (error) {
        false;
    }
};

export const getOne = async (id: number) => {
    try {
        return await prisma.phone.findFirst({ where: { id } });
    } catch (error) {
        false;
    }
};

type PhoneCreateData = Prisma.Args<typeof prisma.phone, "create">["data"];

export const addPhone = async (data: PhoneCreateData) => {
    try {
        return await prisma.phone.create({ data });
    } catch (err) {
        return false;
    }
};

export type PhoneUpdateData = Prisma.Args<
    typeof prisma.phone,
    "update"
>["data"];

export const update = async (id: number, data: PhoneUpdateData) => {
    try {
        return await prisma.phone.update({ where: { id }, data });
    } catch (err) {
        return false;
    }
};

export const remove = async (id: number) => {
    try {
        return await prisma.phone.delete({ where: { id } });
    } catch (err) {
        false;
    }
};

export type searchFiltersPhone = {
    dpt_id?: number;
    code?: string;
    sector?: string;
    phone_number?: string;
    model?: string;
    skip?: number;
    take?: number;
};

export const search = async (data: searchFiltersPhone) => {
    try {
        return await prisma.phone.findMany({
            where: {
                dpt_id: data.dpt_id,
                code: data.code,
                sector: {
                    contains: data.sector,
                    mode: "insensitive",
                },
                model: {
                    contains: data.model,
                    mode: "insensitive",
                },
                phone_number: data.phone_number,
            },
            skip: data.skip,
            take: data.take,
        });
    } catch (err) {
        return false;
    }
};
