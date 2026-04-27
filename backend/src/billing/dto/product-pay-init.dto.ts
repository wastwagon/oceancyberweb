import { IsOptional, IsString, MaxLength } from "class-validator";

export class ProductPayInitDto {
  @IsString()
  @MaxLength(64)
  planCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  externalRef?: string;
}
