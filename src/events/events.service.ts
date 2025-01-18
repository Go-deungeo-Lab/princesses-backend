import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) {}

    async create(data: { title: string; date: Date; userId: number }) {
        return this.prisma.event.create({ data });
    }

    async findAll() {
        return this.prisma.event.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        color: true,
                    },
                },
            },
        });
    }

    async update(id: number, data: { title?: string; date?: Date }) {
        return this.prisma.event.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.event.delete({
            where: { id },
        });
    }
}