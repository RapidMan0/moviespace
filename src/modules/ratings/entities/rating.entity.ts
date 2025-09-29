import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['user_id', 'title_id'])
export class Rating {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column()
  title_id: number;

  @ApiProperty({ minimum: 1, maximum: 10 })
  @Column({ type: 'int' })
  score: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
