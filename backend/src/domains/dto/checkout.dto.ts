import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export interface DomainCheckResult {
  domain: string;
  available: boolean;
}

export interface CheckoutResult {
  kind: string;
  label: string;
  status: string;
  orderId?: string;
  certificateId?: string;
  message: string;
}

export class DomainContactDto {
  @IsEmail()
  @IsOptional()
  emailAddress?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class CheckoutItemDto {
  @IsString()
  @IsNotEmpty()
  kind!: string;

  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class CheckoutRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  @IsNotEmpty()
  items!: CheckoutItemDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => DomainContactDto)
  @IsOptional()
  domainContact?: DomainContactDto;
}
