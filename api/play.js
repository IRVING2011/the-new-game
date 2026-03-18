export default function handler(req,res){

const PASSWORD = process.env.GAME_PASSWORD
const WHITELIST = process.env.IP_WHITELIST.split(",")

const ip =
req.headers["x-forwarded-for"] ||
req.socket.remoteAddress

if(!WHITELIST.includes(ip)){

return res.status(403).json({
success:false
})

}

if(req.method==="POST"){

const body = req.body

if(body.type==="login"){

if(body.password===PASSWORD){

return res.json({success:true})

}

return res.json({success:false})

}

if(body.type==="play"){

const options=["rock","paper","scissors"]

const ai = options[Math.floor(Math.random()*3)]

let result="平手"
let winner="draw"

if(body.choice==="rock" && ai==="scissors"){
result="你贏了"
winner="player"
}

if(body.choice==="scissors" && ai==="paper"){
result="你贏了"
winner="player"
}

if(body.choice==="paper" && ai==="rock"){
result="你贏了"
winner="player"
}

if(result==="平手" && body.choice!==ai){
result="AI贏了"
winner="ai"
}

return res.json({
result:`AI 出 ${ai}`,
winner
})

}

}

}