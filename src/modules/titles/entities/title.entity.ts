import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Title {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: ['MOVIE', 'SERIAL'] })
  @Column({ type: 'enum', enum: ['MOVIE', 'SERIAL'] })
  type: 'MOVIE' | 'SERIAL';

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  original_name?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'int', nullable: true })
  year?: number;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  poster_url?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  genres?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'float', nullable: true })
  popularity?: number;

  @ApiProperty({ required: false })
  @Column({ type: 'int', nullable: true })
  runtime_minutes?: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
