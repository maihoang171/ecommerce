import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang bắt đầu khởi tạo dữ liệu Healthy Food...');

  // 1. Xóa dữ liệu cũ (Xóa theo thứ tự ngược lại để tránh lỗi khóa ngoại)
  await prisma.inventoryLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Đã dọn dẹp dữ liệu cũ.');

  // 2. Tạo Người dùng (Admin và Khách hàng)
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async (_, index) => {
      return prisma.user.create({
        data: {
          username: index === 0 ? 'admin_healthy' : faker.internet.username(),
          password: 'hashed_password_123', // Trong thực tế nên dùng bcrypt
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          role: index === 0 ? 'admin' : 'customer',
          phoneNumber: '0' + faker.string.numeric(9),
          userAddresses: {
            create: {
              recipientName: faker.person.fullName(),
              recipientPhone: '0' + faker.string.numeric(9),
              streetAddress: faker.location.streetAddress(),
              city: 'Ho Chi Minh City',
              district: 'District 1',
              ward: 'Da Kao',
              isDefault: true,
            },
          },
        },
      });
    })
  );

  // 3. Danh mục thực phẩm sạch
  const healthyCategories = [
    { name: 'Organic Vegetables', img: 'vegetables' },
    { name: 'Fresh Fruits', img: 'fruit' },
    { name: 'Nuts & Seeds', img: 'nuts' },
    { name: 'Healthy Drinks', img: 'smoothie' },
    { name: 'Whole Grains', img: 'grain' },
    { name: 'Plant-based Protein', img: 'tofu' }
  ];

  const createdCategories = await Promise.all(
    healthyCategories.map((cat) =>
      prisma.category.create({
        data: {
          name: cat.name,
          imageUrl: faker.image.urlLoremFlickr({ category: cat.img, width: 400, height: 400 }),
        },
      })
    )
  );

  // 4. Tạo Sản phẩm cho từng danh mục
  for (const category of createdCategories) {
    await Promise.all(
      Array.from({ length: 10 }).map(() => {
        const basePrice = faker.number.int({ min: 30000, max: 250000 });
        const hasDiscount = faker.datatype.boolean(0.3); // 30% sản phẩm có giảm giá

        return prisma.product.create({
          data: {
            name: `${faker.commerce.productAdjective()} ${category.name.split(' ').slice(-1)} ${faker.string.alphanumeric(3)}`,
            imageUrl: faker.image.urlLoremFlickr({ category: 'food', width: 640, height: 480 }),
            price: basePrice,
            discountPrice: hasDiscount ? basePrice * 0.8 : null,
            description: faker.commerce.productDescription(),
            stockQuantity: faker.number.int({ min: 10, max: 100 }),
            categoryId: category.id,
            isActive: true,
            specs: {
              origin: 'Viet Nam',
              isOrganic: true,
              calories: `${faker.number.int({ min: 20, max: 400 })} kcal/100g`,
              weight: `${faker.helpers.arrayElement([200, 500, 1000])}g`,
              expiredDate: '2026-12-31'
            },
          },
        });
      })
    );
  }

  console.log('🥗 Đã tạo xong danh mục và sản phẩm Healthy Food!');

  // 5. Tạo một vài Đơn hàng mẫu để Test UI
  const allProducts = await prisma.product.findMany();
  const customer = users.find(u => u.role === 'customer');

  if (customer) {
    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        totalPrice: 150000,
        status: 'delivered',
        paymentMethod: 'COD',
        recipientName: customer.firstName + ' ' + customer.lastName,
        recipientPhone: customer.phoneNumber || '0987654321',
        shippingStreet: '123 Le Loi',
        shippingCity: 'Ho Chi Minh',
        shippingDistrict: 'District 1',
        shippingWard: 'Ben Nghe',
        items: {
          create: {
            productId: allProducts[0].id,
            quantity: 2,
            price: allProducts[0].price,
          }
        },
        payment: {
          create: {
            method: 'COD',
            amount: 150000,
            status: 'completed'
          }
        }
      },
    });
    console.log('📦 Đã tạo đơn hàng mẫu thành công.');
  }

  console.log('✨ Hoàn tất quá trình Seeding!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });