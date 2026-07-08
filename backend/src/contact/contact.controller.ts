import { Body, Controller, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { CreateIntakeDto } from "./dto/create-intake.dto";
import { CreateProposalRequestDto } from "./dto/create-proposal-request.dto";
import { CreateWebsiteToAppQuoteDto } from "./dto/create-website-to-app-quote.dto";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { CreateNewsletterSignupDto } from "./dto/create-newsletter-signup.dto";
import { CreateSecurityAssessmentDto } from "./dto/create-security-assessment.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Post("intake")
  async createIntake(@Body() dto: CreateIntakeDto) {
    return this.contactService.createIntake(dto);
  }

  @Post("proposal")
  async createProposalRequest(@Body() dto: CreateProposalRequestDto) {
    return this.contactService.createProposalRequest(dto);
  }

  @Post("website-to-app")
  async createWebsiteToAppQuote(@Body() dto: CreateWebsiteToAppQuoteDto) {
    return this.contactService.createWebsiteToAppQuote(dto);
  }

  @Post("feedback")
  async createFeedback(@Body() dto: CreateFeedbackDto) {
    return this.contactService.createFeedback(dto);
  }

  @Post("newsletter")
  async createNewsletterSignup(@Body() dto: CreateNewsletterSignupDto) {
    return this.contactService.createNewsletterSignup(dto);
  }

  @Post("security-assessment")
  async createSecurityAssessment(@Body() dto: CreateSecurityAssessmentDto) {
    return this.contactService.createSecurityAssessment(dto);
  }
}
