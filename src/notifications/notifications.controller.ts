import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@GetUser('_id') userId: string) {
    return this.notificationsService.findByUser(userId);
  }

  @Get('unread-count')
  unreadCount(@GetUser('_id') userId: string) {
    return this.notificationsService.countUnread(userId);
  }

  @Patch('mark-read')
  markAllAsRead(@GetUser('_id') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }
}