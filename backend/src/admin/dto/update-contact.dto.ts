import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @IsIn(LEAD_STATUSES)
  status?: (typeof LEAD_STATUSES)[number];

  @IsOptional()
  @IsString()
  @MaxLength(20_000)
  notes?: string;
}
