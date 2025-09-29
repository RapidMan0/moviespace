import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Episode {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title_id: number;

  @ApiProperty()
  @Column()
  season_number: number;

  @ApiProperty()
  @Column()
  episode_number: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'int', nullable: true })
  runtime_minutes?: number;
}