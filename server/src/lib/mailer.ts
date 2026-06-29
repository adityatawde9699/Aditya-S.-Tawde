import nodemailer from 'nodemailer';

import { config, emailConfigured } from '../config.js';
import type { ContactSubmission } from '../db/schema.js';

/**
 * Email notification for contact submissions. Ports Django's
 * ContactService._send_notification: failures are swallowed and logged so a
 * broken SMTP config never degrades the user-facing contact request.
 */

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      requireTLS: config.email.port === 587,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }
  return transporter;
}

export async function sendContactNotification(submission: ContactSubmission): Promise<void> {
  if (!emailConfigured) {
    console.warn(
      `Email notification skipped for submission id=${submission.id} — email is not configured.`,
    );
    return;
  }

  const subject = `New Portfolio Contact: ${submission.name}`;
  const message =
    `You have a new message from your portfolio website.\n\n` +
    `Name:    ${submission.name}\n` +
    `Email:   ${submission.email}\n\n` +
    `Message:\n${submission.message}\n\n` +
    `---\nSent automatically from your portfolio contact form.`;

  try {
    await getTransporter().sendMail({
      from: config.email.user,
      to: config.email.recipient,
      replyTo: submission.email,
      subject,
      text: message,
    });
    console.log(`Email notification dispatched | submission_id=${submission.id}`);
  } catch (err) {
    console.error(
      `Failed to dispatch email notification | submission_id=${submission.id}`,
      err,
    );
  }
}
