import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Feed } from '../feed/feed.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: new Date(), type: 'date' })
  year: Date;

  @Column({ default: false })
  role: boolean;

  @Column({ default: null })
  refresh_token: string;
}
