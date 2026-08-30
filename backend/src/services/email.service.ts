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
   * Main reusable method to dispatch registration confirmation emails via Brevo HTTP API
   */
  static async sendRegistrationConfirmation(options: SendRegistrationConfirmationOptions): Promise<boolean> {
    const { user, event } = options;

    if (!user.email) {
      console.warn("[EmailService] Skipping email dispatch: user email address is missing.");
      return false;
    }

    const rawKey = process.env.SMTP_KEY || process.env.SMTP_PASSWORD || "";
    const apiKey = rawKey.trim();
    if (apiKey) {
      console.log(`[EmailService] API Key starts with "${apiKey.substring(0, 8)}" and has length ${apiKey.length}`);
    }

    if (!apiKey || apiKey.includes("your_brevo_smtp_key_here") || apiKey.includes("your_16_character")) {
      console.warn("[EmailService] Brevo API Key is not configured in environment variables. Skipping email dispatch safely.");
      return false;
    }

    console.log(`[EmailService] Generating email template for ${user.email}...`);

    const subject = `Welcome to Intel oneAPI Student Club!`;
    const htmlContent = this.renderBrandedEmailHtml(user, event);
    const fromEmail = process.env.SMTP_EMAIL || process.env.SMTP_USER || "iosc.edc@gmail.com";

    console.log(`[EmailService] Sending email to ${user.email} via Brevo HTTP API...`);

    const payload = {
      sender: { name: "Intel oneAPI Student Club", email: fromEmail },
      to: [{ email: user.email, name: user.name || "Student" }],
      subject: subject,
      htmlContent: htmlContent,
    };

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Brevo HTTP API responded with status ${response.status}: ${errorText}`);
      }

      const info = await response.json() as any;
      console.log(`[EmailService] Email sent successfully via Brevo HTTP API! Message ID: ${info.messageId}`);
      return true;
    } catch (err: any) {
      console.error("[EmailService] Error sending email via Brevo HTTP API:", err.message);
      return false;
    }
  }
}
