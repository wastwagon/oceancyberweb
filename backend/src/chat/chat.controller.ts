import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatRequestDto } from "./dto/chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getReply(@Body() body: ChatRequestDto) {
    return this.chatService.getReply(body.messages);
  }
}
