import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient();

export class UserRepository {
    async getAllUsers() {
        return await prisma.user.findMany();
    }

    async getUser(id: string) {
        return await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async createUsers(users: { username: string; email: string; password: string }[]) {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        });
    }


    async updateUser(id: string, user: any) {
        return await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: user
        });
    }

    async delete(id: string) {
        return await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
    }
}
