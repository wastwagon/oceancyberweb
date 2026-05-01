import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getReply(@Body() body: { messages: any[] }) {
    return this.chatService.getReply(body.messages);
  }
}
