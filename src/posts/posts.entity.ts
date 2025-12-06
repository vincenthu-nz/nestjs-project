import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('post')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'mediumtext', nullable: true })
  content: string;

  @Column({ type: 'mediumtext', name: 'content_html', nullable: true })
  contentHtml: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'varchar', length: 255, name: 'cover_url', nullable: true })
  coverUrl: string;

  @Column({ type: 'int', default: 0 })
  count: number;

  @Column({ type: 'int', name: 'like_count', default: 0 })
  likeCount: number;

  @Column({ type: 'tinyint', name: 'is_recommend', default: 0 })
  isRecommend: number; // 0: 不推荐, 1: 推荐

  @Column({ type: 'varchar', name: 'status', nullable: true })
  status: string; // 如果 enum 的取值你知道，可以改成 enum 映射

  @Column({ type: 'timestamp', name: 'publish_time', nullable: true })
  publishTime: Date;

  @Column({
    type: 'timestamp',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @Column({ type: 'int', name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ type: 'varchar', length: 36, name: 'authorId', nullable: true })
  authorId: string;
}
