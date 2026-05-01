import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, IsUrl } from "class-validator";

export class CreateWebsiteToAppQuoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  email!: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  company?: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(600)
  websiteUrl!: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  currentStack?: string;

  @IsArray()
  @IsEnum(["ios", "android", "both"], { each: true })
  @IsNotEmpty({ each: true })
  desiredPlatforms!: Array<"ios" | "android" | "both">;

  @IsBoolean()
  @IsOptional()
  needsAuth?: boolean;

  @IsBoolean()
  @IsOptional()
  needsPayments?: boolean;

  @IsBoolean()
  @IsOptional()
  needsPushNotifications?: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  timelineBand!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  budgetBand!: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;
}
