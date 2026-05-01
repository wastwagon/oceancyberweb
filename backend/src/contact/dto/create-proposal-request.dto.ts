import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProposalRequestDto {
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

  @IsEnum(["website", "mobile_app", "ecommerce", "security", "support", "other"])
  projectType!: "website" | "mobile_app" | "ecommerce" | "security" | "support" | "other";

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  currentSituation!: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  requiredScope!: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  budgetBand!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  timelineBand!: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  decisionDeadline?: string;

  @IsBoolean()
  needsNda!: boolean;

  @IsBoolean()
  wantsProposalWalkthrough!: boolean;
}
