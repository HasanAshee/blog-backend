import { Body, Controller, Get, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    const user = await this.usersService.findPublicProfile(id);
    const articles = await this.articlesService.findByAuthor(id);
    return { user, articles };
  }
  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @GetUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    console.log('Datos recibidos en el backend:', updateProfileDto);
    
    const userId = user._id;
    return this.usersService.updateProfile(userId, updateProfileDto);
  }
}
