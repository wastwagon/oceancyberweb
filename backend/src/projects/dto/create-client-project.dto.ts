import { IsEmail, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateClientProjectDto {
  @IsEmail()
  userEmail!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(100)
  totalAmountGhs!: number;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(80)
  kickoffPercent?: number;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(80)
  buildPercent?: number;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(80)
  launchPercent?: number;
}
