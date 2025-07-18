import { RequestHandler } from "express";
import { z } from "zod";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import * as auth from "../services/auth";

export const login: RequestHandler = async (req, res) => {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const body = loginSchema.safeParse(req.body);

    if (!body.success)
        return res.status(400).json({ error: "Dados inválidos" });

    try {
        const user = await auth.validateUser(
            body.data.email,
            body.data.password
        );

        if (!user) {
            return res
                .status(403)
                .json({ error: "E-mail ou senha incorretos" });
        }

        const token = auth.createToken(user.id, user.email, user.role);
        await auth.saveToken(user.id, token);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // true em produção
            maxAge: 1000 * 60 * 60 * 4, // 4h
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};

export const logout: RequestHandler = async (req, res) => {
    res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(0), // força expiração
        })
    );

    res.status(200).json({ message: "Logout realizado com sucesso." });
};

export const validate: RequestHandler = (req, res, next) => {
    const token = req.cookies.token; // pegando o token do cookie

    if (!token) {
        return res.status(403).json({ error: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
            id: number;
            email: string;
            role: string;
        };

        req.user = decoded; // disponibiliza os dados para outras rotas
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
};
