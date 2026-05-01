import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateClientProjectStatusDto {
  @IsString()
  @IsIn([
    "planning",
    "active",
    "in_review",
    "ready_for_launch",
    "launched",
    "on_hold",
    "cancelled",
  ])
  status!: string;

  @IsOptional()
  @IsString()
  note?: string;
}
