import { compare } from "bcrypt";
import { prisma } from "../libs/prisma";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { DecodedToken } from "../types/DecodedToken";

dotenv.config();

export const validateUser = async (email: string, password: string) => {
    try {
        const user = await prisma.admin.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return null;
        }

        const isMatch = await compare(password, user.password);

        return isMatch ? user : null;
    } catch (err) {
        console.error("Erro em validateUser:", err);
        return null;
    }
};

export const createToken = (id: number, email: string, role: string) => {
    const token = JWT.sign(
        { id, email, role },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "4h" }
    );
    return token;
};

export const saveToken = async (userId: number, token: string) => {
    try {
        await prisma.admin.update({
            where: { id: userId },
            data: { token },
        });
    } catch (err) {
        console.error("Erro em saveToken:", err);
    }
};

export const validateToken = (
    token: string
): string | JWT.JwtPayload | undefined => {
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
        return decoded;
    } catch (err) {}
};
