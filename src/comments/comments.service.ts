import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async findByArticleId(articleId: string): Promise<Comment[]> {
    return this.commentModel.find({ article: articleId }).populate('author', 'name profilePictureUrl').sort({ createdAt: -1 }).exec();
  }

  async create(content: string, authorId: string, articleId: string): Promise<Comment> {
    const newComment = new this.commentModel({ content, author: authorId, article: articleId });
    return (await newComment.save()).populate('author', 'name profilePictureUrl');
  }
  async update(commentId: string, authorId: string, content: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.author.toString() !== authorId) {
      throw new ForbiddenException('You are not allowed to edit this comment');
    }
    comment.content = content;
    return (await comment.save()).populate('author', 'name profilePictureUrl');
  }

async remove(commentId: string, authorId: string): Promise<void> {
  const comment = await this.commentModel.findById(commentId);
  if (!comment) {
    throw new NotFoundException('Comment not found');
  }

  console.log('--- Depurando Borrado de Comentario ---');
  console.log('Id author:', comment.author.toString());
  console.log('id token:', authorId);
  console.log('match?:', comment.author.toString() === authorId);

  if (comment.author.toString() !== authorId) {
    throw new ForbiddenException('You are not allowed to delete this comment');
  }
  await this.commentModel.deleteOne({ _id: commentId });
}
}