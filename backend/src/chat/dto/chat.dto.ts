import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export class ChatMessageDto {
  @IsEnum(ChatRole)
  @IsNotEmpty()
  role!: ChatRole;

  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class ChatRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  @IsNotEmpty()
  messages!: ChatMessageDto[];
}
