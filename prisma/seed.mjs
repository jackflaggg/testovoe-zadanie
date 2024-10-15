import { PrismaClient } from '@prisma/client'


// const prisma = new PrismaClient();
//
// const tempUser = {
// 	email: 'rasul@rasul.com',
// 	password: 'rasul'
// };
//
// const posts = [
// 	{
// 		title: 'new Post',
// 		content: 'new Content'
// 	}
// ];
// async function bootstrap() {
// 	await prisma.$connect();
// 	const createdUser = await prisma.user.create({ data: tempUser });
// 	await prisma.post.createMany({
// 		data: posts.map(post => ({...post, authorId: createdUser.id }))
// 	})
// 	await prisma.$disconnect();
// }
// bootstrap();