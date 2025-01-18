import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    create(@Request() req, @Body() data: { title: string; date: string }) {
        return this.eventsService.create({
            title: data.title,
            date: new Date(data.date),
            userId: req.user.userId,
        });
    }

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() data: { title?: string; date?: string },
    ) {
        const updateData: any = { ...data };
        if (data.date) {
            updateData.date = new Date(data.date);
        }
        return this.eventsService.update(Number(id), updateData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.eventsService.delete(Number(id));
    }
}