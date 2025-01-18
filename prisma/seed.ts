import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const users = [
        { username: 'ahyeon', color: '#FF0000' },
        { username: 'yewon', color: '#00FF00' },
        { username: 'gayeon', color: '#0000FF' },
        { username: 'sion', color: '#FFFF00' },
        { username: 'hansol', color: '#FF00FF' },
        { username: 'dasol', color: '#00FFFF' }
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.username, 10);
        await prisma.user.create({
            data: {
                username: user.username,
                password: hashedPassword,
                color: user.color
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });