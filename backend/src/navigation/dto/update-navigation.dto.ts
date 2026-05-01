import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class NavigationItemDto {
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @IsString()
  @IsNotEmpty()
  heading!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  href!: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class NavigationMenuDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NavigationItemDto)
  @IsOptional()
  items?: NavigationItemDto[];
}

export class UpdateNavigationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NavigationMenuDto)
  @IsNotEmpty()
  menus!: NavigationMenuDto[];
}
