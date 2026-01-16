import prisma from "../lib/prisma.js";

export const getService = async (isSale = false) => {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(isSale && {
        discountPrice: {
          gt: 0,
        },
      }),
    },
    include: {
      category: true,
    },
  });

  return products.sort((a, b) => {
    const discountA = a.price - a.discountPrice;
    const discountB = b.price - b.discountPrice;
    return discountB - discountA;
  });
};
