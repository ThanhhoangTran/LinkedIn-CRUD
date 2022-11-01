import { IsString } from 'class-validator';
export class CreateFeedDto {
  @IsString()
  body: string;
}
