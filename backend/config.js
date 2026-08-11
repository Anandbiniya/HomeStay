import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

function list(value, fallback) {
  return String(value || fallback)
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
}

export const backendConfig = {
  port: Number(process.env.PORT || 3001),
  dataDir: path.resolve(__dirname, 'data'),
  notificationChannels: list(process.env.NOTIFICATION_CHANNELS, 'WHATSAPP,EMAIL'),
  instagramUsername: process.env.INSTAGRAM_USERNAME || 'host.illam',
  host: {
    whatsappNumber: String(process.env.HOST_WHATSAPP_NUMBER || '919747232233').replace(/\D/g, ''),
    email: process.env.HOST_EMAIL || 'hello@hostillam.com',
  },
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'Hostillam Leads <noreply@hostillam.com>',
  },
}

export default backendConfig
