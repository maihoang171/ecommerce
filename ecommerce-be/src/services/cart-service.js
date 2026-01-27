import prisma from "../lib/prisma.js";

export const addItemToCartService = async (
  userId,
  productId,
  quantityToAdd = 1,
) => {
  return await prisma.$transaction(async (tx) => {
    let order = await tx.order.findFirst({
      where: {
        userId: userId,
        status: "pending",
      },
    });

    if (!order) {
      order = await tx.order.create({
        data: {
          userId: userId,
          status: "pending",
          totalPrice: 0,
        },
      });
    }

    const product = await tx.product.findUnique({
      where: {
        id: Number(productId),
      },
      select: {
        price: true,
        stockQuantity: true,
        isActive: true,
      },
    });

    if (!product || !product.isActive) {
      const error = new Error("Product not found or inactive");
      error.statusCode = 404;
      throw error;
    }

    const existingItem = await tx.orderItem.findUnique({
      where: {
        orderId_productId: {
          orderId: order.id,
          productId,
        },
      },
    });

    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

    if (product.stockQuantity < currentQuantityInCart + quantityToAdd) {
      const error = new Error(
        `Sorry, only ${product.stockQuantity} items remaining in stock`,
      );
      error.statusCode = 400;
      throw error;
    }

    const orderItem = await tx.orderItem.upsert({
      where: {
        orderId_productId: {
          orderId: order.id,
          productId,
        },
      },

      update: {
        quantity: { increment: quantityToAdd },
      },

      create: {
        orderId: order.id,
        productId: productId,
        quantity: quantityToAdd,
        price: product.price,
      },

      include: {
        product: true,
      },
    });

    const allItems = await tx.orderItem.findMany({
      where: {
        orderId: order.id,
      },
    });

    const newTotalPrice = allItems.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    await tx.order.update({
      where: { id: order.id },
      data: {
        totalPrice: newTotalPrice,
      },
    });

    return orderItem;
  });
};

export const getCartService = async (userId) => {
  const cart = await prisma.order.findFirst({
    where: {
      userId,
      status: "pending",
    },

    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              imageUrl: true,
              price: true,
              discountPrice: true,
              description: true,
              stockQuantity: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      totalPrice: 0,
    };
  }

  return cart;
};

export const deleteItemService = async (userId, productId) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        userId,
        status: "pending",
      },
    });

    if (!order) {
      const error = new Error("order not found or has been already paid");
      error.statusCode = 404;
      throw error;
    }

    await tx.orderItem.delete({
      where: {
        orderId_productId: {
          orderId: order.id,
          productId: productId,
        },
      },
    });

    const remainingItems = await tx.orderItem.findMany({
      where: {
        orderId: order.id,
      },
    });

    const totalPriceUpdate = remainingItems.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    const updateOrder = tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        totalPrice: totalPriceUpdate,
      },
      include: {
        items: true,
      },
    });

    return updateOrder;
  });
};

export const clearCartService = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        userId,
        status: "pending",
      },
    });

    if (!order) {
      const error = new Error("order not found or has been already paid");
      error.statusCode = 404;
      throw error;
    }

    await tx.orderItem.deleteMany({
      where: {
        orderId: order.id,
      },
    });

    return await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        totalPrice: 0,
      },
    });
  });
};
