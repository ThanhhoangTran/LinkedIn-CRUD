import { Expose } from 'class-transformer';
export class UserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  year: Date;

  @Expose()
  role: boolean;

  @Expose()
  access_token: string;
}
