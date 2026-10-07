"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
class EmailService {
    /**
     * Generates team-specific email subject and body content based on applicant interests
     */
    static getTeamEmailContent(userName, interests) {
        const name = userName || "Applicant";
        const primaryInterest = (interests && interests.length > 0 ? interests[0] : "").trim().toLowerCase();
        if (primaryInterest === "i3") {
            const subject = "IoSC-EDC Team Application Received - Team i3";
            const bodyHtml = `
        <div class="greeting">Dear Applicant,</div>
        <p>
          Thank you for applying to the <strong>IoSC-EDC Team</strong>. We truly appreciate your interest and enthusiasm towards being a part of the team.
        </p>
        <p>
          As the next step in the selection process, we are sharing a few resources to help you understand the team, its work, and what will be expected from you.
        </p>
        <p>
          Please find the relevant resources below:
        </p>
        
        <div class="resources-box">
          <p class="resources-title"><strong>Resources:</strong></p>
          <ul class="resource-list">
            <li><strong>HTML:</strong> <a href="https://youtu.be/HcOc7P5BMi4?si=_0kGxQA0DHwYoVK0" target="_blank">https://youtu.be/HcOc7P5BMi4?si=_0kGxQA0DHwYoVK0</a></li>
            <li><strong>CSS:</strong> <a href="https://youtu.be/wRNinF7YQqQ?si=35ft42MsuWzNVgsn" target="_blank">https://youtu.be/wRNinF7YQqQ?si=35ft42MsuWzNVgsn</a></li>
            <li><strong>JS:</strong> <a href="https://youtu.be/VlPiVmYuoqw?si=WlNSS-2pmkBSfQ0k" target="_blank">https://youtu.be/VlPiVmYuoqw?si=WlNSS-2pmkBSfQ0k</a></li>
          </ul>
        </div>

        <div class="note-box">
          <strong style="color: #38bdf8;">Additional Guidelines:</strong>
          <ul style="margin: 6px 0 0 0; padding-left: 20px; color: #cbd5e1;">
            <li><strong>For 1st year:</strong> Please go through the tutorials above.</li>
            <li><strong>For 2nd year:</strong> Projects would be appreciated.</li>
          </ul>
        </div>

        <p>
          We encourage you to go through these resources carefully and use them to prepare for the upcoming stages of the selection process.
        </p>
        <p>
          Best of luck, and we look forward to seeing your enthusiasm and ideas!
        </p>
        <p style="margin-top: 24px;">
          Best regards,<br/>
          <strong>IoSC-EDC Team</strong>
        </p>
      `;
            return { subject, bodyHtml };
        }
        if (primaryInterest === "i5") {
            const subject = "IoSC-EDC Team Application Received - Team i5";
            const bodyHtml = `
        <div class="greeting">Dear Applicant,</div>
        <p>
          Thank you for applying to the <strong>IoSC-EDC Team</strong>. We truly appreciate your interest and enthusiasm towards being a part of the team.
        </p>
        <p>
          We have received your application and will reach out to you with further updates regarding the next stages.
        </p>
        <p>
          Best of luck, and we look forward to seeing your enthusiasm and ideas!
        </p>
        <p style="margin-top: 24px;">
          Best regards,<br/>
          <strong>IoSC-EDC Team</strong>
        </p>
      `;
            return { subject, bodyHtml };
        }
        if (primaryInterest === "i7") {
            const subject = "IoSC-EDC Team Application Received - Team i7";
            const bodyHtml = `
        <div class="greeting">Dear Applicant,</div>
        <p>
          Thank you for applying to the <strong>IoSC-EDC Team</strong>. We truly appreciate your interest and enthusiasm towards being a part of the team.
        </p>
        <p>
          As the next step in the selection process, we are sharing a few resources to help you understand the team, its work, and what will be expected from you.
        </p>
        <p>
          Please find the relevant resources below:
        </p>
        
        <div class="resources-box">
          <p class="resources-title"><strong>Resources:</strong></p>
          <ul class="resource-list">
            <li><a href="https://playvalorant.com/en-us/news/dev/how-we-got-to-the-best-performing-valorant-servers-since-launch/" target="_blank">How We Got to the Best Performing Valorant Servers Since Launch</a></li>
            <li><a href="https://www.gamedeveloper.com/design/the-aesthetics-of-game-art-and-game-design" target="_blank">The Aesthetics of Game Art and Game Design</a></li>
          </ul>
        </div>

        <p>
          We encourage you to go through these resources carefully and use them to prepare for the upcoming stages of the selection process.
        </p>
        <p>
          Best of luck, and we look forward to seeing your enthusiasm and ideas!
        </p>
        <p style="margin-top: 24px;">
          Best regards,<br/>
          <strong>IoSC-EDC Team</strong>
        </p>
      `;
            return { subject, bodyHtml };
        }
        if (primaryInterest === "i9") {
            const subject = "IoSC-EDC Team Application Received - Team i9";
            const bodyHtml = `
        <div class="greeting">Dear Applicant,</div>
        <p>
          Thank you for applying to the <strong>IoSC-EDC Team</strong>. We truly appreciate your interest and enthusiasm towards being a part of the team.
        </p>
        <p>
          As the next step in the selection process, we are sharing a few resources to help you understand the team, its work, and what will be expected from you.
        </p>
        <p>
          Please find the relevant resources below:
        </p>
        
        <div class="resources-box">
          <p class="resources-title"><strong>Resources:</strong></p>
          <ol class="resource-list">
            <li><strong>What Is Machine Learning:</strong> <a href="https://youtu.be/Gv9_4yMHFhI?si=qt0NCCSiWx4rZra7" target="_blank">https://youtu.be/Gv9_4yMHFhI?si=qt0NCCSiWx4rZra7</a></li>
            <li><strong>Getting hands on:</strong> <a href="https://www.kaggle.com/code/dansbecker/basic-data-exploration" target="_blank">https://www.kaggle.com/code/dansbecker/basic-data-exploration</a></li>
            <li><strong>Brief about GenAI and AgenticAI:</strong> <a href="https://www.youtube.com/watch?v=jNJH6uD5LQE" target="_blank">https://www.youtube.com/watch?v=jNJH6uD5LQE</a></li>
          </ol>
        </div>

        <p>
          We encourage you to go through these resources carefully and use them to prepare for the upcoming stages of the selection process.
        </p>
        <p>
          Best of luck, and we look forward to seeing your enthusiasm and ideas!
        </p>
        <p style="margin-top: 24px;">
          Best regards,<br/>
          <strong>IoSC-EDC Team</strong>
        </p>
      `;
            return { subject, bodyHtml };
        }
        // Default template for other teams
        const teamName = interests && interests.length > 0 ? interests.join(", ") : "IoSC-EDC";
        const subject = `IoSC-EDC Team Application Received - ${teamName}`;
        const bodyHtml = `
      <div class="greeting">Dear Applicant,</div>
      <p>
        Thank you for applying to the <strong>IoSC-EDC Team</strong>. We truly appreciate your interest and enthusiasm towards being a part of the team.
      </p>
      <p>
        We have successfully received your application. We will reach out to you soon with further updates.
      </p>
      <p>
        Best of luck, and we look forward to seeing your enthusiasm and ideas!
      </p>
      <p style="margin-top: 24px;">
        Best regards,<br/>
        <strong>IoSC-EDC Team</strong>
      </p>
    `;
        return { subject, bodyHtml };
    }
    /**
     * Generates reusable HTML email template with Intel oneAPI Student Club branding
     */
    static renderBrandedEmailHtml(userName, interests) {
        const { subject, bodyHtml } = this.getTeamEmailContent(userName, interests);
        const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 40px 16px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        h1 { color: #0082db; margin-bottom: 24px; font-size: 22px; font-weight: 700; text-align: center; }
        p { font-size: 15px; color: #cbd5e1; line-height: 1.6; margin-top: 14px; text-align: left; }
        .greeting { font-size: 16px; font-weight: 600; color: #f8fafc; text-align: left; margin-bottom: 16px; }
        .resources-box { background-color: #1e293b; border-radius: 8px; padding: 16px 20px; margin: 18px 0; text-align: left; }
        .resources-title { margin-top: 0; margin-bottom: 10px; color: #38bdf8; font-size: 15px; }
        .resource-list { margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 14px; line-height: 1.8; }
        .resource-list a { color: #38bdf8; text-decoration: underline; word-break: break-all; }
        .note-box { background-color: #0f172a; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 6px; margin: 18px 0; text-align: left; font-size: 14px; }
        hr { border: 0; border-top: 1px solid #1e293b; margin: 24px 0; }
        .footer { font-size: 12px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Intel oneAPI Student Club</h1>
        ${bodyHtml}
        <hr />
        <div class="footer">
          Intel oneAPI Student Club · USAR GGSIPU EDC
        </div>
      </div>
    </body>
    </html>
    `;
        return { subject, htmlContent };
    }
    /**
     * Main reusable method to dispatch registration confirmation emails via Brevo HTTP API
     */
    static async sendRegistrationConfirmation(options) {
        const { user, interests } = options;
        if (!user.email) {
            console.warn("[EmailService] Skipping email dispatch: user email address is missing.");
            return false;
        }
        const rawKey = process.env.BREVO_API_KEY || "";
        const apiKey = rawKey.trim();
        if (!apiKey) {
            console.error("[EmailService] Configuration Error: BREVO_API_KEY is not defined in environment variables.");
            return false;
        }
        console.log(`[EmailService] API Key starts with "${apiKey.substring(0, 8)}" and has length ${apiKey.length}`);
        if (apiKey.includes("your_brevo") || apiKey.includes("your_16_character")) {
            console.error("[EmailService] Configuration Error: BREVO_API_KEY contains placeholder/template values.");
            return false;
        }
        console.log(`[EmailService] Generating team-specific email template for ${user.email} (interests: ${interests?.join(", ") || "none"})...`);
        const { subject, htmlContent } = this.renderBrandedEmailHtml(user.name, interests);
        console.log(`[EmailService] Sending email to ${user.email} via Brevo HTTP API...`);
        const payload = {
            sender: { name: "IoSC EDC", email: "updates@iosc.win" },
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
                console.error(`[EmailService] Brevo HTTP API failed. Status: ${response.status}. Error: ${errorText}`);
                throw new Error(`Brevo HTTP API responded with status ${response.status}: ${errorText}`);
            }
            const info = await response.json();
            console.log(`[EmailService] Email sent successfully via Brevo HTTP API! Message ID: ${info.messageId}`);
            return true;
        }
        catch (err) {
            console.error("[EmailService] Error sending email via Brevo HTTP API:", err.message);
            return false;
        }
    }
}
exports.EmailService = EmailService;
