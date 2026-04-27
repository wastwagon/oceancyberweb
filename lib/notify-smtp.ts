import { createTransport, type Transporter } from "nodemailer";

type MailerState = { transporter: Transporter | null; from: string | null };

let cached: MailerState | null = null;

function getMailer(): MailerState {
  if (cached) return cached;
  const from = (process.env.SMTP_FROM || "").trim() || null;
  if (!from) {
    cached = { transporter: null, from: null };
    return cached;
  }

  const smtpUrl = (process.env.SMTP_URL || "").trim();
  if (smtpUrl) {
    try {
      const transporter = createTransport(smtpUrl);
      cached = { transporter, from };
      return cached;
    } catch {
      console.warn("[notify-smtp] Invalid SMTP_URL, mail disabled.");
      cached = { transporter: null, from: null };
      return cached;
    }
  }

  const host = (process.env.SMTP_HOST || "").trim();
  if (!host) {
    console.warn("[notify-smtp] Set SMTP_URL or SMTP_HOST for outbound mail.");
    cached = { transporter: null, from: null };
    return cached;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const transporter = createTransport({
    host,
    port,
    secure,
    auth: {
      user: (process.env.SMTP_USER || "").trim() || undefined,
      pass: (process.env.SMTP_PASS || "").trim() || undefined,
    },
  });
  cached = { transporter, from };
  return cached;
}

export function isSmtpOutboxConfigured(): boolean {
  const m = getMailer();
  return m.transporter !== null && m.from !== null;
}

/**
 * Best-effort notification; does not throw (swallows and logs on failure).
 */
export async function sendSmtpTo(to: string, subject: string, text: string, html?: string): Promise<void> {
  const { transporter, from } = getMailer();
  if (!transporter || !from) return;
  try {
    await transporter.sendMail({
      from,
      to: to.trim(),
      subject: subject.slice(0, 256),
      text,
      html: html ?? text.replace(/\n/g, "<br>"),
    });
  } catch (e) {
    console.error(
      "[notify-smtp] send failed:",
      e instanceof Error ? e.message : e,
    );
  }
}
