import "server-only";
import nodemailer from "nodemailer";

/*
 * Yeni talep gelince e-posta bildirimi. Sunucudaki .env'de SMTP ayarları varsa çalışır:
 *   SMTP_HOST, SMTP_PORT (465/587), SMTP_USER, SMTP_PASS, SMTP_FROM
 * Ayar yoksa sessizce atlanır; talepler yine Yönetim › Talepler'de görünür.
 */
export async function epostaGonder(kime: string, konu: string, metin: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !kime) return false;
  const port = Number(SMTP_PORT || 465);
  const t = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  await t.sendMail({ from: SMTP_FROM || SMTP_USER, to: kime, subject: konu, text: metin });
  return true;
}
