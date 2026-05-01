import { Body, Controller, Post } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";
import { CreateCalculatorLeadDto } from "./dto/create-calculator-lead.dto";

@Controller("calculator")
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post("lead")
  async createLead(@Body() dto: CreateCalculatorLeadDto) {
    return this.calculatorService.createLead(dto);
  }
}
