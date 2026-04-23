import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
    private notificationsService: NotificationsService,) 
  {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findPublicProfile(id: string) {
    const user = await this.userModel.findById(id).select('-password -email').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateProfileDto);
    return user.save();
  }

  async followUser(currentUserId: string, targetUserId: string): Promise<User> {
    if (currentUserId === targetUserId) {
      throw new NotFoundException("You can't follow yourself");
    }

    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
    } else {
      currentUser.following.push(targetUserId as any);
      targetUser.followers.push(currentUserId as any);
      await this.notificationsService.create(targetUserId, currentUserId, 'follow');
    }

    await currentUser.save();
    await targetUser.save();

    return targetUser;
  }
}