import { PostsService, PostsRo } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post.dot';

@ApiTags('Post Management')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Create a new post
   * @param post
   */
  @ApiOperation({ summary: 'Create post' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   * Get all posts
   */
  @ApiOperation({ summary: 'Get post list' })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * Get post by ID
   * @param id
   */
  @ApiOperation({ summary: 'Get post by ID' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  /**
   * Update post
   * @param id
   * @param post
   */
  @ApiOperation({ summary: 'Update post' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * Delete post
   * @param id
   */
  @ApiOperation({ summary: 'Delete post' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
