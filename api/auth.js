export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { password } = req.body;

  const ip =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "";

  const whitelist = (process.env.IP_WHITELIST || "").split(",");

  if (!whitelist.includes(ip)) {
    return res.status(403).json({ error: "IP not allowed" });
  }

  if (password === process.env.PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ error: "Wrong password" });
  }

}
