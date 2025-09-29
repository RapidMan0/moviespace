import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Watchlist {
  @ApiProperty()
  @PrimaryColumn()
  user_id: number;

  @ApiProperty()
  @PrimaryColumn()
  title_id: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
