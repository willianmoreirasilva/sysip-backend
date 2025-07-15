export type DecodedToken = {
    id: number,
    email: string,
    role : "ADMIN" | "USER",
    iat: number,
    exp: number
}