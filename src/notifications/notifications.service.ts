import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(recipient: string, sender: string, type: string, articleId?: string) {
    if (recipient === sender) return null;

    const notification = new this.notificationModel({
      recipient,
      sender,
      type,
      article: articleId,
    });
    return notification.save();
  }

  async findByUser(userId: string) {
    return this.notificationModel
      .find({ recipient: userId })
      .populate('sender', 'name profilePictureUrl')
      .populate('article', 'title')
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
  }

  async countUnread(userId: string) {
    return this.notificationModel.countDocuments({ recipient: userId, read: false });
  }

  async markAllAsRead(userId: string) {
    return this.notificationModel.updateMany({ recipient: userId, read: false }, { read: true });
  }
}