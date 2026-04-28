import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateSiteProjectDto {
  @IsString()
  @MaxLength(300)
  title!: string;

  @IsString()
  @MaxLength(160)
  slug!: string;

  @IsString()
  @MaxLength(120)
  category!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ArrayMinSize(0)
  @IsString({ each: true })
  techStack!: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  imageUrl?: string | null;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  /** Portfolio detail bundle (`details.v === 1` on site). Valid JSON object. */
  @IsOptional()
  @IsObject()
  details?: Record<string, unknown>;
}

export class UpdateSiteProjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  imageUrl?: string | null;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsObject()
  details?: Record<string, unknown> | null;
}
