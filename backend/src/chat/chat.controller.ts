import { Body, Controller, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ChatService } from "./chat.service";
import { ChatRequestDto } from "./dto/chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Throttle({ default: { limit: 15, ttl: 60_000 } })
  @Post()
  async getReply(@Body() body: ChatRequestDto) {
    return this.chatService.getReply(body.messages);
  }
}
