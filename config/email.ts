const email = {
  service: 'Gmail',
  signature: process.env.EMAIL_SIGNATURE as string,
  host: process.env.EMAIL_HOST as string,
  port: parseInt(process.env.EMAIL_PORT as string, 10),
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
} as const

export const provider = {
  server: `smtp://${email.auth.user}:${email.auth.pass}@${email.host}:${email.port}`,
  from: email.signature,
}
