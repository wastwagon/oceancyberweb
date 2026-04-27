import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRenewalDto {
  @IsString()
  planCode!: string;

  @IsOptional()
  @IsBoolean()
  autoRenewUsingWallet?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  externalRef?: string;
}
