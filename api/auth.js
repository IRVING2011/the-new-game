export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { password } = req.body

  if (password === process.env.GAME_PASSWORD) {

    res.setHeader(
      "Set-Cookie",
      "session=valid; Path=/; HttpOnly; Secure; SameSite=Strict"
    )

    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ error: "Wrong password" })
}
