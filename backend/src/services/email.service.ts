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
   * Creates a Nodemailer transporter configured for Gmail SMTP on port 465
   */
  private static getTransporter() {
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword || smtpPassword.includes("your_16_character")) {
      return null;
    }

    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
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
   * Generates a reusable, production-ready HTML email template with Intel oneAPI Student Club branding
   */
  private static renderBrandedEmailHtml(user: RegistrationEmailUserPayload, event: RegistrationEmailEventPayload): string {
    const name = user.name || "Student";
    const eventName = event.title || "Intel oneAPI Event / Membership";
    const eventDate = event.date || "To be announced";
    const venue = event.venue || "GGSIPU East Delhi Campus (USAR)";
    const rawBody = event.emailBody || "Thank you for registering for {{event_name}}. Your registration has been confirmed successfully!";

    // Compute interpolated email body
    const bodyContent = this.replacePlaceholders(rawBody, {
      name,
      event_name: eventName,
      event_date: eventDate,
      venue,
    });

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmed - Intel oneAPI Student Club</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #111827; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #005295 0%, #0068b5 50%, #0082db 100%); padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; color: #e0f2fe; font-size: 13px; opacity: 0.9; }
        .badge { display: inline-block; background-color: #059669; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px; }
        .content { padding: 32px 28px; }
        .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; margin-bottom: 16px; }
        .message-box { background-color: #1e293b; border-left: 4px solid #0068b5; padding: 16px; border-radius: 6px; margin: 20px 0; color: #cbd5e1; line-height: 1.6; }
        .details-card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin-top: 24px; }
        .details-card h3 { margin-top: 0; color: #38bdf8; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #334155; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #94a3b8; font-size: 13px; font-weight: 500; }
        .detail-value { color: #f1f5f9; font-size: 13px; font-weight: 600; text-align: right; }
        .footer { background-color: #0b0f19; border-top: 1px solid #1e293b; padding: 20px 24px; text-align: center; color: #64748b; font-size: 12px; }
        .footer a { color: #38bdf8; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">✓ Registration Confirmed</span>
          <h1>Intel oneAPI Student Club</h1>
          <p>GGSIPU East Delhi Campus (USAR)</p>
        </div>
        <div class="content">
          <div class="greeting">Hello ${name},</div>
          
          <div class="message-box">
            ${bodyContent}
          </div>

          <div class="details-card">
            <h3>Event Information</h3>
            <div class="detail-row">
              <span class="detail-label">Event / Activity</span>
              <span class="detail-value">${eventName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date & Time</span>
              <span class="detail-value">${eventDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Venue</span>
              <span class="detail-value">${venue}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Intel oneAPI Student Club · USAR GGSIPU EDC</p>
          <p>Need assistance? Reach out to us via <a href="https://www.linkedin.com/company/iosc-usar/">LinkedIn</a> or <a href="https://instagram.com/iosc_edc">Instagram</a>.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Main reusable method to dispatch registration confirmation emails via Nodemailer Gmail SMTP
   */
  static async sendRegistrationConfirmation(options: SendRegistrationConfirmationOptions): Promise<boolean> {
    const { user, event } = options;

    if (!user.email) {
      console.warn("[EmailService] Skipping email dispatch: user email address is missing.");
      return false;
    }

    console.log(`[EmailService] Generating email template for ${user.email}...`);

    const subject = event.emailSubject
      ? this.replacePlaceholders(event.emailSubject, { event_name: event.title || "IoSC Event" })
      : `Registration Confirmed: ${event.title || "Intel oneAPI Student Club"}`;

    const htmlContent = this.renderBrandedEmailHtml(user, event);

    const transporter = this.getTransporter();
    if (!transporter) {
      console.warn("[EmailService] SMTP_EMAIL or SMTP_PASSWORD is not configured in .env. Skipping email dispatch safely.");
      return false;
    }

    console.log(`[EmailService] Sending email to ${user.email} via Gmail SMTP (smtp.gmail.com:465)...`);

    try {
      const info = await transporter.sendMail({
        from: `"Intel oneAPI Student Club" <${process.env.SMTP_EMAIL}>`,
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
