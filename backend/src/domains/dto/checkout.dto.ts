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
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  address1!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  stateProvince!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsOptional()
  organizationName?: string;
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
