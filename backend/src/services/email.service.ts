import nodemailer from "nodemailer";

export interface RegistrationEmailUserPayload {
  name: string;
  email: string;
}

export interface RegistrationEmailEventPayload {
  title: string;
  date?: string;
  venue?: string;
  emailSubject?: string;
  emailBody?: string;
}

export interface SendRegistrationConfirmationOptions {
  user: RegistrationEmailUserPayload;
  event: RegistrationEmailEventPayload;
}

export class EmailService {
  /**
   * Creates a Nodemailer transporter configured for Brevo (or legacy Gmail) SMTP
   */
  private static getTransporter() {
    const host = process.env.SMTP_HOST || "smtp-relay.brevo.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_KEY || process.env.SMTP_PASSWORD;

    if (!user || !pass || pass.includes("your_brevo_smtp_key_here") || pass.includes("your_16_character")) {
      // Legacy Gmail Fallback
      const legacyEmail = process.env.SMTP_EMAIL;
      const legacyPass = process.env.SMTP_PASSWORD;
      if (!legacyEmail || !legacyPass || legacyPass.includes("your_16_character")) {
        return null;
      }
      return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: legacyEmail,
          pass: legacyPass,
        },
      });
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  /**
   * Replaces dynamic template placeholders (e.g. {{name}}, {{event_name}}, {{event_date}}, {{venue}}, {{email_body}})
   */
  private static replacePlaceholders(template: string, data: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      result = result.replace(placeholder, value || "");
    }
    return result;
  }

  /**
   * Generates a reusable HTML email template with Intel oneAPI Student Club branding welcome message
   */
  private static renderBrandedEmailHtml(user: RegistrationEmailUserPayload, event: RegistrationEmailEventPayload): string {
    const name = user.name || "Student";
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to IoSC</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 40px; text-align: center; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        h1 { color: #0082db; margin-bottom: 24px; font-size: 22px; font-weight: 700; }
        p { font-size: 16px; color: #cbd5e1; line-height: 1.6; margin-top: 16px; text-align: left; }
        .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; text-align: left; }
        hr { border: 0; border-top: 1px solid #1e293b; margin: 24px 0; }
        .footer { font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 style="color: #0082db; margin-bottom: 24px;">Intel oneAPI Student Club</h1>
        <div class="greeting">Hi ${name},</div>
        <p>
          Welcome to Intel oneAPI Student Club (IoSC)! We are excited to have you join our tech-driven student community.
        </p>
        <hr />
        <div class="footer">
          Intel oneAPI Student Club · USAR GGSIPU EDC
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Main reusable method to dispatch registration confirmation emails via Nodemailer SMTP
   */
  static async sendRegistrationConfirmation(options: SendRegistrationConfirmationOptions): Promise<boolean> {
    const { user, event } = options;

    if (!user.email) {
      console.warn("[EmailService] Skipping email dispatch: user email address is missing.");
      return false;
    }

    console.log(`[EmailService] Generating email template for ${user.email}...`);

    const subject = `Welcome to Intel oneAPI Student Club!`;
    const htmlContent = this.renderBrandedEmailHtml(user, event);

    const transporter = this.getTransporter();
    if (!transporter) {
      console.warn("[EmailService] SMTP credentials are not configured in .env. Skipping email dispatch safely.");
      return false;
    }

    const fromEmail = process.env.SMTP_EMAIL || process.env.SMTP_USER || "iosc.edc@gmail.com";
    console.log(`[EmailService] Sending email to ${user.email} via SMTP...`);

    try {
      const info = await transporter.sendMail({
        from: `"Intel oneAPI Student Club" <${fromEmail}>`,
        to: user.email,
        subject: subject,
        html: htmlContent,
      });

      console.log(`[EmailService] Email sent successfully to ${user.email}! Message ID: ${info.messageId}`);
      return true;
    } catch (err: any) {
      console.error("[EmailService] Full SMTP Error during sendMail:", {
        message: err.message,
        code: err.code,
        command: err.command,
        response: err.response,
        stack: err.stack,
      });
      return false;
    }
  }
}
