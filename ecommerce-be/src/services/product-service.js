import prisma from "../lib/prisma.js";

export const getService = async (keyword = "") => {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });
};
