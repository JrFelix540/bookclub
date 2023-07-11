import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { PersonalizationData } from "@sendgrid/helpers/classes/personalization";
import { getEnvironmentVariables } from "../config/env";

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, REDIRECT_DOMAIN } =
  getEnvironmentVariables();

sendgrid.setApiKey(SENDGRID_API_KEY);

export enum EmailType {
  PasswordReset,
  EmailConfirmation,
}

const passwordResetTemplateId = "d-2d1d4dbe6e984fc596d0b1709bc50f5a";
const emailConfirmationTemplateId = "";

const templateById: Record<EmailType, string> = {
  [EmailType.PasswordReset]: passwordResetTemplateId,
  [EmailType.EmailConfirmation]: emailConfirmationTemplateId,
};

export const generatePasswordResetPayload = (
  resetToken: string,
  username: string
) => {
  return {
    link: `${REDIRECT_DOMAIN}/auth/password/reset/${resetToken}`,
    username,
  };
};

export const generateEmailConfirmationPayload = (
  confirmToken: string,
  username: string
) => {
  return {
    link: `${REDIRECT_DOMAIN}/auth/email/confirm/${confirmToken}`,
    username,
  };
};

export const sendMail = async (
  type: EmailType,
  ...messages: PersonalizationData[]
) => {
  const sender = SENDGRID_SENDER_EMAIL;
  const templateId = templateById[type];
  const message: MailDataRequired = {
    from: sender,
    templateId,
    personalizations: messages,
  };

  try {
    console.log("About to send mail");
    await sendgrid.send(message);
  } catch (err) {
    console.log("Sending mail error", err);
    throw new Error("An error occurred while sending mail");
  }
};
