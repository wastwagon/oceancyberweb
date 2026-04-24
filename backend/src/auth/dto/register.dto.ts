import { IsEmail, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @MinLength(10)
  @MaxLength(128)
  password!: string;
}
