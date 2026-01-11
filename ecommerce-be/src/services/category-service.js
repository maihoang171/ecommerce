import prisma from "../lib/prisma.js";

export const getAllService = async () => {
    return await prisma.category.findMany()
}