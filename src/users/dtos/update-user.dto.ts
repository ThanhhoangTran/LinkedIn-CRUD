import { IsString, IsDate, IsOptional, IsEmail } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsDate()
  year: Date;
}
