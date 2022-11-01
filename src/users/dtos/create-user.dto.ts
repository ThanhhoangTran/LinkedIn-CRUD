import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  year: string;

  @IsBoolean()
  @IsOptional()
  role: boolean;
}
