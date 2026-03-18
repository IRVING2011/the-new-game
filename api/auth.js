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

  const whitelist = (process.env.IP_WHITELIST || "")
    .split(",")
    .map(ip => ip.trim());

  if (!whitelist.includes(ip)) {
    return res.status(403).json({ error: "NO_PERMISSION" });
  }

  if (password === process.env.PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: "WRONG_PASSWORD" });
  }

}
