import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, ValidationPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdateArticleDto } from './dto/update-article.dto';
import { OptionalAuthGuard } from 'src/auth/guards/optional-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body(new ValidationPipe()) createArticleDto: CreateArticleDto, @GetUser() user: UserDocument) {
    return this.articlesService.create(createArticleDto, user);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  likeArticle(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.articlesService.like(id, userId);
  }

  @Post(':id/dislike')
  @UseGuards(AuthGuard('jwt'))
  dislikeArticle(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.articlesService.dislike(id, userId);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  findAll(@GetUser('_id') userId: string | null) {
      return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto,
    @GetUser('_id') userId: string,
  ) {
    return this.articlesService.update(id, updateArticleDto, userId);
  }

  @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.articlesService.remove(id, userId);
  }

}