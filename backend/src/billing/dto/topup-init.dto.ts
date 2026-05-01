import { IsInt, Min } from "class-validator";

export class TopupInitDto {
  /** Amount in GHS major units (e.g. 50 means GHS 50.00) */
  @IsInt()
  @Min(1)
  amountGhs!: number;
}
