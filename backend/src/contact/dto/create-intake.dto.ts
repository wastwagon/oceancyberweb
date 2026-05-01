import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateIntakeDto {
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

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  serviceNeeds!: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  goals!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  budgetBand!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  timelineBand!: string;

  @IsBoolean()
  hasExistingSite!: boolean;

  @IsEnum(["email", "phone", "whatsapp"])
  contactMethod!: "email" | "phone" | "whatsapp";

  @IsEnum(["discovery_call", "proposal_walkthrough", "asynchronous_quote"])
  meetingType!:
    | "discovery_call"
    | "proposal_walkthrough"
    | "asynchronous_quote";

  @IsString()
  @IsOptional()
  @MaxLength(80)
  preferredDate?: string;
}
