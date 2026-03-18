export default function handler(req, res) {

  const PASSWORD = process.env.GAME_PASSWORD
  const WHITELIST = process.env.IP_WHITELIST?.split(",")

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress

  if (!WHITELIST.includes(ip)) {
    return res.status(403).json({ error: "IP not allowed" })
  }

  const { password } = req.body

  if (password === PASSWORD) {
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ error: "Wrong password" })
}