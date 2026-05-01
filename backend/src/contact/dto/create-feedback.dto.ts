import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  articleId!: string;

  @IsBoolean()
  @IsNotEmpty()
  helpful!: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  issue?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  query?: string;
}
