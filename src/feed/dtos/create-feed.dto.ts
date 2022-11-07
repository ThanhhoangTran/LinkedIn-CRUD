import { IsArray, IsString } from 'class-validator';
export class CreateFeedDto {
  @IsString()
  body: string;

  @IsArray()
  categories: number[];
}
