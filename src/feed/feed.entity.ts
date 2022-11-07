import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;
}
