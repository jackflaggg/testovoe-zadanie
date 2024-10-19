import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const promotions = [
	{
		title:       'tinkoff',
		description: 'акция тинькофф',
		published:   true,
		createdAt:   new Date(),
		updatedAt:   new Date(),
		status:      "APPROVED",
	},
	{
		title:       'sberbank',
		description: 'акция сбербанк',
		published:   true,
		createdAt:   new Date(),
		updatedAt:   new Date(),
		status:      "APPROVED",
	},
];

const adminUser = {
	email: 'rasul@rasul.com',
	password: '230900',
	role: "ADMIN",
	createdAt:  new Date(),
	updatedAt: new Date(),
};


async function bootstrap() {
	try {
		await prisma.$connect();
		const createdUser = await prisma.userModel.create({ data: adminUser });
		console.log(createdUser);
		const promotionsWithSupplierId = promotions.map(promo => ({
			...promo,
			supplierId: createdUser.id // Используйте созданный ID пользователя
		}));
		console.log(promotionsWithSupplierId)
		await prisma.promotionModel.createMany({
			data: promotionsWithSupplierId
		})
		console.log('успех')
	}  catch(e){
		console.error('Ошибка при создании администратора или акций:', e);
	} finally {
		await prisma.$disconnect();
	}
}
bootstrap();