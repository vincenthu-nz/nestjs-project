import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { Repository } from 'typeorm';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;

    if (!title) {
      throw new HttpException('Post title is required', 401);
    }

    const existingPost = await this.postsRepository.findOne({
      where: { title },
    });

    if (existingPost) {
      throw new HttpException('Post already exists', 401);
    }

    return await this.postsRepository.save(post);
  }

  // Get post list
  async findAll(query): Promise<PostsRo> {
    const qb = this.postsRepository.createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();

    const { pageNum = 1, pageSize = 10, ...params } = query;

    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count };
  }

  // Get post by ID
  async findById(id): Promise<PostsEntity | null> {
    return await this.postsRepository.findOne(id);
  }

  // Update post
  async updateById(id, post): Promise<PostsEntity> {
    const existingPost = await this.postsRepository.findOne(id);

    if (!existingPost) {
      throw new HttpException(`Post with id ${id} does not exist`, 401);
    }

    const updatedPost = this.postsRepository.merge(existingPost, post);
    return this.postsRepository.save(updatedPost);
  }

  // Delete post
  async remove(id) {
    const existingPost = await this.postsRepository.findOne(id);

    if (!existingPost) {
      throw new HttpException(`Post with id ${id} does not exist`, 401);
    }

    return await this.postsRepository.remove(existingPost);
  }
}
