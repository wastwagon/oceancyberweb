import { Module } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";
import { CalculatorController } from "./calculator.controller";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [MailModule],
  controllers: [CalculatorController],
  providers: [CalculatorService],
  exports: [CalculatorService],
})
export class CalculatorModule {}
