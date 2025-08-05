import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto, user: UserDocument): Promise<Article> {
    const article = new this.articleModel({
      ...createArticleDto,
      author: user._id,
    });
    return article.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel
      .find()
      .populate('author', 'name')
      .populate('commentCount')
      .exec();
  }

  async findOne(id: string): Promise<Article | null> {
    const article = await this.articleModel
      .findById(id)
      .populate('author', 'name')
      .populate('commentCount')
      .exec();
    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, userId: string): Promise<Article> {
    const article = await this.articleModel.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }

    if (article.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this article');
    }

    Object.assign(article, updateArticleDto);
    return article.save();
}

  async remove(id: string, userId: string): Promise<void> {
    const article = await this.articleModel.findById(id).exec();

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }

    console.log('ID del autor en el artículo:', article.author.toString());
    console.log('ID del usuario intentando borrar:', userId);
    console.log('¿Son los tipos iguales?:', typeof article.author.toString(), typeof userId);


    if (article.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this article');
    }

    await this.articleModel.deleteOne({ _id: id }).exec();
  }

  async like(articleId: string, userId: string): Promise<Article> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    article.dislikes = article.dislikes.filter(id => id.toString() !== userId);
    
    const likesStrings = new Set(article.likes.map(id => id.toString()));
    if (likesStrings.has(userId)) {
      likesStrings.delete(userId);
    } else {
      likesStrings.add(userId);
    }
    article.likes = [...likesStrings] as any;
    return article.save();
  }

  async dislike(articleId: string, userId: string): Promise<Article> {
    const article = await this.articleModel.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    
    article.likes = article.likes.filter(id => id.toString() !== userId);

    const dislikesStrings = new Set(article.dislikes.map(id => id.toString()));
    if (dislikesStrings.has(userId)) {
      dislikesStrings.delete(userId);
    } else {
      dislikesStrings.add(userId);
    }
    article.dislikes = [...dislikesStrings] as any;
    return article.save();
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    return this.articleModel
      .find({ author: authorId })
      .populate('author', 'name')
      .populate('commentCount')
      .exec();
  }

}