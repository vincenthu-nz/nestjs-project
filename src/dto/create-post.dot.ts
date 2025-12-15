import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Post title' })
  @IsNotEmpty({ message: 'Post title is required' })
  readonly title: string;

  @ApiProperty({ description: 'Author' })
  @IsNotEmpty({ message: 'Author information is required' })
  readonly author: string;

  @ApiPropertyOptional({ description: 'Post content' })
  readonly content: string;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  readonly cover_url: string;

  @ApiProperty({ description: 'Post type' })
  @IsNumber({}, { message: 'Post type must be a number' })
  readonly type: number;
}
