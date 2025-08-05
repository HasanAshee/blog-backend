import { Controller, Get, Post, Param, Body, UseGuards, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('comments') // 👈 Ruta base simplificada
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('article/:articleId') // Ruta para obtener comentarios de un artículo
  findByArticleId(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticleId(articleId);
  }

  @Post('article/:articleId') // Ruta para crear un comentario en un artículo
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('articleId') articleId: string,
    @Body('content') content: string,
    @GetUser('_id') authorId: string,
  ) {
    return this.commentsService.create(content, authorId, articleId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body('content') content: string,
    @GetUser('_id') authorId: string,
  ) {
    return this.commentsService.update(id, authorId, content);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id') id: string,
    @GetUser('_id') authorId: string,
  ) {
    return this.commentsService.remove(id, authorId);
  }
}