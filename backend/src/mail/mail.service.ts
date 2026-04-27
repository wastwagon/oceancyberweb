import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Transporter } from "nodemailer";
import { createTransport } from "nodemailer";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;
  private fromAddress: string | null = null;

  constructor(private readonly config: ConfigService) {
    this.fromAddress = (this.config.get<string>("SMTP_FROM") || "").trim() || null;
    const smtpUrl = (this.config.get<string>("SMTP_URL") || "").trim();
    if (!this.fromAddress) {
      this.logger.log("Outgoing email disabled (set SMTP_FROM to enable).");
      return;
    }

    try {
      if (smtpUrl) {
        this.transporter = createTransport(smtpUrl);
        this.logger.log("Mail transport: SMTP_URL");
        return;
      }
      const host = (this.config.get<string>("SMTP_HOST") || "").trim();
      if (!host) {
        this.logger.warn("SMTP_FROM is set but neither SMTP_URL nor SMTP_HOST is configured. Email disabled.");
        this.fromAddress = null;
        return;
      }
      const port = Number(this.config.get<string>("SMTP_PORT") || 587);
      const secure = this.config.get<string>("SMTP_SECURE") === "true" || port === 465;
      this.transporter = createTransport({
        host,
        port,
        secure,
        auth: {
          user: (this.config.get<string>("SMTP_USER") || "").trim() || undefined,
          pass: (this.config.get<string>("SMTP_PASS") || "").trim() || undefined,
        },
      });
      this.logger.log(`Mail transport: ${host}:${port}`);
    } catch (e) {
      this.logger.error("Failed to configure mail transport", e);
      this.transporter = null;
    }
  }

  isEnabled(): boolean {
    return this.transporter !== null && this.fromAddress !== null;
  }

  /**
   * Sends mail; never throws. Logs on failure.
   */
  async send(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    if (!this.isEnabled() || this.transporter === null || this.fromAddress === null) {
      return;
    }
    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to: to.trim(),
        subject: subject.slice(0, 256),
        text,
        html: html ?? text.replace(/\n/g, "<br>"),
      });
    } catch (e) {
      this.logger.error(`Failed to send mail to ${to}: ${e instanceof Error ? e.message : e}`);
    }
  }
}
