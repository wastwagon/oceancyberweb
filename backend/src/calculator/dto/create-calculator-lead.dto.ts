import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateCalculatorLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  email!: string;

  @IsString()
  @IsNotEmpty()
  timeline!: string;

  @IsString()
  @IsNotEmpty()
  platformId!: string;

  @IsString()
  @IsNotEmpty()
  designId!: string;

  @IsString()
  @IsNotEmpty()
  complexityId!: string;

  @IsArray()
  @IsString({ each: true })
  featureIds!: string[];

  @IsEnum(["proforma_download", "print_summary"])
  @IsOptional()
  event?: "proforma_download" | "print_summary";
}
