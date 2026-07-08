import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, Max } from "class-validator";

export class CreateSecurityAssessmentDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  email!: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  company?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  scorePercent!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tier!: string;

  @IsOptional()
  domainScores?: Array<{
    domainId: string;
    title: string;
    earned: number;
    max: number;
    percent: number;
  }>;
}
